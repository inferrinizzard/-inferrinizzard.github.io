var width = window.innerWidth - 16,
	height = window.innerHeight - 8;

var svg = d3.select("svg").attr("width", height).attr("height", height);
svg.append("rect").attr("class", "background").attr("width", height).attr("height", height);

var bg = svg.append("g");
var map = bg.append("g").classed("map", true);

var title = document.getElementById("title");
var subtitle = document.getElementById("subtitle");
var value = document.getElementById("value");
var radio = document.getElementById("radio");
var japanese = false;
var statMode = "Live Births";
var currentPrefecture;

Promise.all([d3.json("japan.topo.json"), d3.csv("japan.csv")]).then(([data, stats]) => {
	let features = topojson.feature(data, data.objects.japan).features.map((f) => ({
		...f,
		properties: (([name, kanji, id]) => ({
			name: name.replace(/\s(Ken|To|Fu)/, "").replace(" Do", "do"),
			kanji: kanji.replace("北海道", "北海道 ").slice(0, -1),
			id: id,
		}))(Object.values(f.properties)),
	}));
	let centre = features
		.map((f) =>
			(([a, b]) => [a[0] + b[0], a[1] + b[1]].map((x) => x / 2))(d3.geoBounds(f.geometry))
		)
		.reduce((r, f) => [r[0] + f[0], r[1] + f[1]], [0, 0])
		.map((x) => x / features.length);

	// console.log(features, centre);

	let [catRaw, national] = stats.splice(0, 2);
	let [eng, jap] = stats.splice(0, 47).reduce(([e, j], cur, i) => {
		let [name_j, name_e] = Object.values(cur);
		let [p_e, p_j] = Object.entries(cur)
			.slice(2)
			.reduce(
				([_e, _j], [k, v]) =>
					v === ""
						? [_e, _j]
						: [
								{ ..._e, [catRaw[k]]: v },
								{ ..._j, [k]: v },
						  ],
				[]
			);
		return [
			{ ...e, [name_e]: { name: name_e, ...p_e, id: i } },
			{ ...j, [name_j]: { name: name_j, ...p_j, id: i } },
		];
	}, []);

	let categories = {
		...catRaw,
		...Object.entries(catRaw).reduce((acc, [k, v]) => ({ ...acc, [v]: k }), {}),
	};
	console.log(categories, national);
	// console.log(eng, jap);
	let statTypes = Object.values(catRaw).slice(2).slice(0, -1);

	radio.innerHTML = statTypes.reduce(
		(acc, cur, i) =>
			acc +
			`<input id="radio${i}" type="radio" name="statType" value="${cur}" ${
				!i ? "checked" : ""
			}/><label for="${cur}">${cur}</label><br/>`,
		""
	);
	statTypes.forEach((s, i) =>
		document
			.getElementById("radio" + i)
			.addEventListener("click", () => ((statMode = s), setText(), draw()))
	);

	const setText = () => {
		// console.log(currentPrefecture);
		subtitle.textContent = (japanese ? categories[statMode] : statMode) + ": ";
		if (currentPrefecture) {
			title.textContent = currentPrefecture.name;
			value.textContent = currentPrefecture[japanese ? categories[statMode] : statMode];
		} else {
			title.textContent = japanese ? national["名前"] : national["都道府県"];
			subtitle.textContent = (japanese ? "全国" : "Total ") + subtitle.textContent;
			value.textContent = national[categories[statMode]];
		}
	};
	setText();

	document
		.getElementById("japanese")
		.addEventListener(
			"change",
			(e) => (
				(japanese = e.target.checked),
				(currentPrefecture = currentPrefecture
					? japanese
						? jap[categories[currentPrefecture.name]]
						: eng[currentPrefecture.name]
					: null),
				statTypes.forEach(
					(s, i) =>
						(document.getElementById("radio" + i).nextElementSibling.textContent = japanese
							? categories[s]
							: s)
				),
				setText()
			)
		);

	let topology = map.selectAll("path").data(features).enter().append("path");

	const draw = () => {
		let [min, max] = Object.values(eng).reduce(
			([lo, hi], cur) => [
				Number.parseFloat(lo) < Number.parseFloat(cur[statMode])
					? Number.parseFloat(lo)
					: Number.parseFloat(cur[statMode]),
				Number.parseFloat(hi) > Number.parseFloat(cur[statMode])
					? Number.parseFloat(hi)
					: Number.parseFloat(cur[statMode]),
			],
			[]
		);
		topology
			.attr(
				"d",
				d3.geoPath().projection(
					d3
						.geoMercator()
						.scale(1800)
						.center(centre)
						.translate([height / 2, height / 2])
				)
			)
			.attr("fill", (d) =>
				d3.interpolateBuGn((max - Number.parseFloat(eng[d.properties.name][statMode])) / min / 50)
			);
	};
	draw();

	topology
		.attr("vector-effect", "non-scaling-stroke")
		.on(
			"mouseenter",
			(x) => (
				(currentPrefecture = japanese ? jap[x.properties.kanji] : eng[x.properties.name]), setText()
			)
		)
		.on("mouseout", () => ((currentPrefecture = null), setText()));
});

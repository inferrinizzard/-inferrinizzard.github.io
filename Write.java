import java.io.*;
import java.util.*;

public class Write{
    public static void main(String args[]){
        String content = buffRead("post.txt").get(0);

        List<String> htmlFile = buffRead("template.html");
        List<String> index = buffRead("index.html");
        List<String> fresh = buffRead("fresh.txt");
        List<String> carTemplate = buffRead("carousel.html");

        int[] indices = findIndices(content, '$');

        String title = cutText(content, indices, 0);
        String body = cutText(content, indices, 1);
        String date = cutText(content, indices, 2);
        String type = cutText(content, indices, 3);
        String count = fresh.get(4);

        int[] artIndices = findIndices(content, '%');
        String article = content.substring(artIndices[0]+1, artIndices[1]).trim();

        int[] carIndices = findIndices(content, '@');
        String carousel = content.substring(carIndices[0]+1, carIndices[1]).trim();
        String thumbnails = content.substring(carIndices[1]+1, carIndices[2]).trim();
        String media = carTemplate.get(0) + carousel;
        for(int i=17;i<25;i++)
            media+=carTemplate.get(i);
        media+=thumbnails + carTemplate.get(carTemplate.size()) + "<br>";

        for(int i=0;i<htmlFile.size();i++){
            String temp = htmlFile.get(i);
            temp = temp.replace("$title", title);
            temp = temp.replace("$media", media);
            temp = temp.replace("$body", body);
            temp = temp.replace("$date", date);
            temp = temp.replace("$count", count);
            temp = temp.replace("$type", type);
            htmlFile.set(i,temp);
            if(temp.contains("grid-sizer"))
                htmlFile.add(i+1,article);
        }

        for(int i=0;i<index.size();i++)
            if(index.get(i).contains("grid-sizer"))
                index.add(i+1,article); 
        
        buffWrite(htmlFile, "posts/"+title+".html");
        buffWrite(index, "index.html");

        int num = Integer.parseInt(count);
        fresh.set(4,Integer.toString(num+1));
        buffWrite(fresh, "fresh.txt");
        File postFile = new File("post.txt");
        postFile.delete();
    }

    static List<String> buffRead(String url){
        List<String> text = new ArrayList<String>();
        try{
            FileInputStream fStream = new FileInputStream(url);
            DataInputStream in = new DataInputStream(fStream);
            BufferedReader br = new BufferedReader(new InputStreamReader(in));
            String strLine;

            while((strLine = br.readLine())!=null)
                text.add(strLine);
            in.close();
        }
        catch (Exception e){//Catch exception if any
            System.err.println("Error: " + e.getMessage());
        }
        return text;
    }

    static boolean buffWrite(List<String> text, String url){
        boolean success = true;
        try{
            FileWriter fWriter = new FileWriter(url);
            BufferedWriter writer = new BufferedWriter(fWriter);
            for (String s : text) {
                writer.write(s);
                writer.newLine();
            }
            writer.close();
        }
        catch (Exception e){//Catch exception if any
            System.err.println("Error: " + e.getMessage());
            success = false;
        }
        return success;
    }

    static int[] findIndices(String str, char c){
        List<Integer> list = new ArrayList<Integer>();
        for(int i=0;i<str.length();i++)
            if(str.charAt(i)==c)
                list.add(i);
        int[] num = new int[list.size()];
        for(int i=0;i<list.size();i++)
            num[i]=list.get(i);
        return num;
    }

    static String cutText(String str, int[] index ,int i){
        String text;
        if(i==0)
            text = str.substring(0,index[0]);
        else
            text = str.substring(index[i-1]+1,index[i]);
        return text.trim();
    }

}
import java.io.*;
import java.util.*;
class Write{
    public static void main(String args[]){
        List<String> content = new ArrayList<String>();

        try{
            FileInputStream fStream = new FileInputStream("post.txt");
            DataInputStream in = new DataInputStream(fStream);
            BufferedReader br = new BufferedReader(new InputStreamReader(in));
            String strLine;

            while((strLine = br.readLine())!=null)
                content.add(strLine);
            in.close();
        }
        catch (Exception e){//Catch exception if any
            System.err.println("Error: " + e.getMessage());
        }

        List<String> htmlFile = new ArrayList<String>();

        try{
            FileInputStream fStream = new FileInputStream("template.html");
            DataInputStream in = new DataInputStream(fStream);
            BufferedReader br = new BufferedReader(new InputStreamReader(in));
            String strLine;
            while ((strLine = br.readLine()) != null){
                htmlFile.add(strLine);
            }
            in.close();
        }
        catch (Exception e){//Catch exception if any
            System.err.println("Error: " + e.getMessage());
        }

        String title = content.get(0);
        String date = content.get(1);
        String video = content.get(2);
        String body = content.get(3);
        // String count = content.get(4);

        for(int i=0;i<htmlFile.size();i++){
            String temp = htmlFile.get(i);
            temp =  temp.replace("$title", title);
            temp =  temp.replace("$date", date);
            temp =  temp.replace("$video", video);
            temp =  temp.replace("$body", body);
            htmlFile.set(i,temp);
        }

        try{
            FileWriter fWriter = new FileWriter("posts/"+title+".html");
            BufferedWriter writer = new BufferedWriter(fWriter);
            for (String s : htmlFile) {
                writer.write(s);
                writer.newLine();
            }
            writer.close();
        }
        catch (Exception e){//Catch exception if any
            System.err.println("Error: " + e.getMessage());
        }
    }
}
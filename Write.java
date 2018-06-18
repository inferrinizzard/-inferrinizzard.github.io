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
            // Open the file that is the first 
            // command line parameter
            FileInputStream fStream = new FileInputStream("template.html");
            // Get the object of DataInputStream
            DataInputStream in = new DataInputStream(fStream);
            BufferedReader br = new BufferedReader(new InputStreamReader(in));
            String strLine;
            //Read File Line By Line
            while ((strLine = br.readLine()) != null){
                // Print the content on the console
                htmlFile.add(strLine);
            }
            //Close the input stream
            in.close();
        }
        catch (Exception e){//Catch exception if any
            System.err.println("Error: " + e.getMessage());
        }

        String title = content.get(1);
        String date = content.get(2);
        String video = content.get(3);
        String body = content.get(4);
        // String count = content.get(0);

        for(int i=0;i<htmlFile.size();i++){
            String temp = htmlFile.get(i);
            temp =  temp.replace("$title", title);
            temp =  temp.replace("$date", date);
            temp =  temp.replace("$video", video);
            temp =  temp.replace("$body", body);
            htmlFile.set(i,temp);
        }

        try{
            FileWriter fWriter = new FileWriter(title+".html");
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
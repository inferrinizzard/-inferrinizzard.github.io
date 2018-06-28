import java.io.*;
import java.util.*;

public class Write{
    public static void main(String args[]){
        String content = buffRead("post.txt").get(0);

        List<String> htmlFile = buffRead("template.html");

        List<String> fresh = buffRead("fresh.txt");

        int[] indices = findIndices(content);

        String title = cutText(content, indices,0);
        String date = cutText(content, indices,1);
        String video = cutText(content, indices,2);
        String body = cutText(content, indices,3);
        String count = fresh.get(4);

        for(int i=0;i<htmlFile.size();i++){
            String temp = htmlFile.get(i);
            temp =  temp.replace("$title", title);
            temp =  temp.replace("$date", date);
            temp =  temp.replace("$video", video);
            temp =  temp.replace("$body", body);
            temp =  temp.replace("$count", count);
            htmlFile.set(i,temp);
        }
        buffWrite(htmlFile, "posts/"+title+".html");

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

    static int[] findIndices(String str){
        List<Integer> list = new ArrayList<Integer>();
        for(int i=0;i<str.length();i++)
            if(str.charAt(i)=='$')
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
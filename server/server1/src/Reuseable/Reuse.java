package Reuseable;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;


public class Reuse {
	Connection connection = null;
	Map<String,Object> map = null;
	
	private Reuse() {
	
	}
	
	public boolean reGex(String regex,String find) {
		Pattern pattern = Pattern.compile(regex);
		Matcher matcher = pattern.matcher(find);
				
		return matcher.find();
	}
	
	public int getSizeOfTable() {
		ResultSet resultSet;
		try {
			resultSet = getConnection().createStatement().executeQuery("Select COUNT(*) From `users`");
			resultSet.next();
			return resultSet.getInt(1);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return -1;
		
	}
	
	
	public Connection getConnection() throws Exception {
		Class.forName("com.mysql.jdbc.Driver");      
		Connection connection = DriverManager.getConnection("jdbc:mysql://localhost/servers","HariKrish","");
        return connection;
    }
	
	public Map<String,Object> jsonStringToMapParse(HttpServletRequest request) {
		try {
			request.setCharacterEncoding("UTF-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		String str = "";
		try {
			BufferedReader bufferedReader = request.getReader();
			for(String i;(i=bufferedReader.readLine())!=null;) {
				str += i;
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		Gson gson = new Gson();
		map = gson.fromJson(str, new TypeToken<Map<Object, String>>(){}.getType());
		return map;
		
	}
	
	public String mapToJsonParse(Map<String,Object> map) {
		
		
		
		Gson gson = new Gson();
		return gson.toJson(map,new TypeToken<Map<String,Object>>(){}.getType());
	}
	
	public void addHeaders(HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
	    response.setHeader("Access-Control-Allow-Methods", "POST, GET");
	    response.setHeader("Access-Control-Max-Age", "3600");
	    response.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	}
	
	public static Reuse getInstance() {
		return new Reuse();
	}
}

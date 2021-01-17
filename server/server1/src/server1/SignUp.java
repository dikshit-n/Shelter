package server1;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import Reuseable.Reuse;


@WebServlet("/SignUp")
public class SignUp extends HttpServlet{
	PreparedStatement preparedStatement = null;
	String currentId = "";
	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		Reuse.getInstance().addHeaders(resp);
		resp.setContentType("application/json");
		resp.setCharacterEncoding("UTF-8");
		try {
			preparedStatement = Reuse.getInstance().getConnection().prepareStatement("INSERT INTO `users`(`Name`, `Status`, `Email`, `Password`, `Phone`, `Id`, "
					+ "`Street`, `Town`, `District`) "
					+ "VALUES (?,?,?,?,?,?,?,?,?)");
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		Map<String,Object> map = Reuse.getInstance().jsonStringToMapParse(req);
		if(map!=null) {
			String regex = "^(?=.*[0-9])"
                    + "(?=.*[a-z])(?=.*[A-Z])"
                    + "(?=.*[@#$%^&+=])"
                    + "(?=\\S+$).{8,20}$";
			
			
			
			if(!Reuse.getInstance().reGex(regex, map.get("password").toString())) {
				resp.setStatus(HttpServletResponse.SC_NOT_ACCEPTABLE);
			}
			else {
				try {
					preparedStatement.setString(4, map.get("password").toString());
					preparedStatement.setString(1, map.get("name").toString());
					preparedStatement.setString(2, "");
					preparedStatement.setString(3, map.get("email").toString());
					preparedStatement.setString(5, map.get("phone").toString());
					currentId = map.get("name").toString()+"@"+String.format("%06d", Reuse.getInstance().getSizeOfTable());
					preparedStatement.setString(6, currentId);
					preparedStatement.setString(7, map.get("street").toString());
					preparedStatement.setString(8, map.get("town").toString());
					preparedStatement.setString(9, map.get("district").toString());
					
					preparedStatement.execute();
					resp.setStatus(200);
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}	
				
			
		}//map!=null Ends
		HashMap<String,Object> forReturn = new HashMap<String,Object>();forReturn.put("token", currentId);
		resp.getWriter().print(Reuse.getInstance().mapToJsonParse(forReturn));
		
		
	}
}

package server1;

import java.io.IOException;import java.net.http.HttpRequest;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Reuseable.Reuse;
@WebServlet("/SignIn")
public class SignIn extends HttpServlet{
	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		Reuse.getInstance().addHeaders(resp);
		resp.setContentType("application/json");resp.setCharacterEncoding("UTF-8");
		Map<String,Object> map = Reuse.getInstance().jsonStringToMapParse(req);
		try {
			PreparedStatement preparedStatement =  Reuse.getInstance().getConnection().prepareStatement("SELECT  `Email`, `Password`,`Id` FROM `users` WHERE `Email`=?");
			preparedStatement.setString(1, map.get("email").toString());
			ResultSet resultSet = preparedStatement.executeQuery();
			try {
			resultSet.next();
			if(map.get("email").equals(resultSet.getString(1)) && map.get("password").equals(resultSet.getString(2))) {
				resp.setStatus(HttpServletResponse.SC_ACCEPTED);
				resp.getWriter().print(Reuse.getInstance().mapToJsonParse(new HashMap<String, Object>(){{put("token", resultSet.getString(3));}}));
			
			}
			else {
				resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			}
			}
			catch(SQLException s) {resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);}
		
		
		} 
		
		
		
		
		catch (Exception e) {
			e.printStackTrace();
		} 
	}
}

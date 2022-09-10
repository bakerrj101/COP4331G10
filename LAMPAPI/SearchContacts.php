<?php

	$inData = getRequestInfo();
	
	$searchResults = "";
	$searchCount = 0;

	$conn = new mysqli("localhost", "G10ApiAccessUser", "WeLoveCOP4331WithLeinecker", "COP4331_G10_db");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("SELECT ID, firstName, lastName, email, phoneNumber, address, city, state, zip from Contacts where UserID=?");
		$stmt->bind_param("s", $inData["userId"]);
		$stmt->execute();
		
		$result = $stmt->get_result();
		
		while($row = $result->fetch_assoc())
		{
			if( $searchCount > 0 )
			{
				$searchResults .= ",";
			}
			$searchCount++;
            $searchResults .= '{"id":"' . $row["ID"] . '", "firstName" : "' . $row["firstName"]. '", "lastName" : "' . $row["lastName"]. '", "phoneNumber" : "' . $row["phoneNumber"]. '", "email" : "' . $row["email"]. '", "address" : "' . $row["address"]. '", "zip" : "' . $row["zip"]. '", "city" : "' . $row["city"]. '", "state" : "' . $row["state"]. '", "userId" : "' . $inData["userId"]. '"}';
		}
		
		if( $searchCount == 0 )
		{
			returnWithError( "No Records Found" );
		}
		else
		{
			returnWithInfo( $searchResults );
		}
		
		$stmt->close();
		$conn->close();
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
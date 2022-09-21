<?php

	$inData = getRequestInfo();
	
	$searchResults = "";
	$searchCount = 0;
	$pageNumber = $inData["pageNumber"];
	$UserID = $inData["UserID"];
	$searchInput = "%" . $inData["search"] . "%";
	$number_of_contacts_per_page = 20;
	$offset = ($pageNumber - 1) * $number_of_contacts_per_page;

	$conn = new mysqli("localhost", "G10ApiAccessUser", "WeLoveCOP4331WithLeinecker", "COP4331_G10_db");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$countOfContacts = "SELECT count(*) from Contacts where (FirstName like '$searchInput' OR LastName like '$searchInput' OR PhoneNumber like '$searchInput' OR Email like '$searchInput' OR Address like '$searchInput' OR Zip like '$searchInput' OR City like '$searchInput' OR State like '$searchInput') and UserID=$UserID";
		$resultCount = mysqli_query($conn,$countOfContacts);
		$data=mysqli_fetch_array($resultCount);
		$totalNumberOfContacts = $data[0];

		$query = "SELECT * from Contacts where (FirstName like '$searchInput' OR LastName like '$searchInput' OR PhoneNumber like '$searchInput' OR Email like '$searchInput' OR Address like '$searchInput' OR Zip like '$searchInput' OR City like '$searchInput' OR State like '$searchInput') and UserID=$UserID LIMIT $offset, $number_of_contacts_per_page";
		$result = mysqli_query($conn,$query);
		
		while($row = $result->fetch_assoc())
		{
			if( $searchCount == 0 )
			{
				$totalPages = ceil($totalNumberOfContacts/$number_of_contacts_per_page);
				$searchResults .= '{"totalPages":"' . $totalPages. '", "totalContacts":"' . $totalNumberOfContacts. '"}';
				$searchResults .= ",";
			}
			if( $searchCount > 0 )
			{
				$searchResults .= ",";
			}
			$searchCount++;
            $searchResults .= '{"id":"' . $row["ID"] . '", "firstName" : "' . $row["FirstName"]. '", "lastName" : "' . $row["LastName"]. '", "phoneNumber" : "' . $row["PhoneNumber"]. '", "email" : "' . $row["Email"]. '", "address" : "' . $row["Address"]. '", "zip" : "' . $row["Zip"]. '", "city" : "' . $row["City"]. '", "state" : "' . $row["State"]. '", "userId" : "' . $row["UserID"]. '"}';
		}
		
		if( $searchCount == 0 )
		{
			returnWithError( "No Records Found" );
		}
		else
		{
			returnWithInfo( $searchResults );
		}
		
		$resultCount->close();
		$result->close();
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
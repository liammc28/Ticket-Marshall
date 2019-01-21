### Below is some automated tests we did using ionic serve

    public static void signupcustomer(String [] details)

    {
	  
	  

	  driver.findElement(By.name("createanaccount")).click();
	  try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}      
      

      //Enter email
      driver.findElement(By.name("email")).sendKeys(details[2]);
      try {
  		Thread.sleep(2000);
  	} catch (InterruptedException e) {
  		// TODO Auto-generated catch block
  		e.printStackTrace();
  	}      
      
      //Enter password
      driver.findElement(By.name("password")).sendKeys(details[3]);
      try {
  		Thread.sleep(2000);
  	} catch (InterruptedException e) {
  		// TODO Auto-generated catch block
  		e.printStackTrace();
  	}      
      
      //Click register button to complete
      driver.findElement(By.name("register")).click();
      try {
  		Thread.sleep(2000);
  	} catch (InterruptedException e) {
  		// TODO Auto-generated catch block
  		e.printStackTrace();
  	}	  
  }

public static void changePassword(String oldpassword, String newpassword)
  {
	 	 
	 //Find and click button to change
	  driver.findElement(By.name("tapheretoedit")).click();
	  try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}      
      
	//Find and enter schoolname
	  driver.findElement(By.name("password")).sendKeys(oldpassword);
      try {
  		Thread.sleep(2000);
  	} catch (InterruptedException e) {
  		// TODO Auto-generated catch block
  		e.printStackTrace();
  	}
      
      driver.findElement(By.name("newpassword")).sendKeys(newpassword);
      try {
  		Thread.sleep(2000);
  	} catch (InterruptedException e) {
  		// TODO Auto-generated catch block
  		e.printStackTrace();
  	}
      
      //Enter email
      
      
      //Click register button to complete
      driver.findElement(By.name("change")).click();
      try {
  		Thread.sleep(2000);
  	} catch (InterruptedException e) {
  		// TODO Auto-generated catch block
  		e.printStackTrace();
  	}	  
  }

 
  public void skiplogintest1() throws Exception {
       
	  //driver.get("http://localhost:8100/ionic-lab");
	  //driver.get("http://localhost/index.html");
	
	  
	  Thread.sleep(2000);
        //driver.get("http://localhost/login.html");
       
        
        
        //driver.get("http://localhost/loggedin.html");
	  driver.get(""http://localhost:8100/ionic-lab/login.html");
  
	  Thread.sleep(200);
        
        String title = driver.getTitle();
        
        
        Assert.assertEquals(title, "Login page");
  }


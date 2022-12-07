CREATE TABLE Inquiry (
    inquiryId int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[type] varchar(255) NOT NULL UNIQUE,
	description varchar(255) NOT NULL,
	createdDate datetime DEFAULT(getdate()), 
	updatedDate datetime DEFAULT(getdate())
);

  CREATE TABLE Contact (
    contactId int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	name nvarchar(255) NOT NULL UNIQUE,
	email nvarchar(255) NOT NULL,
	mobileNumber varchar(255) NOT NULL,
	inquiryId int FOREIGN KEY REFERENCES Inquiry(inquiryId),
	subject nvarchar(255) NOT NULL,
	specificDetails nvarchar(255) NOT NULL,
	createdDate datetime DEFAULT(getdate()), 
	updatedDate datetime DEFAULT(getdate())
);


-- stored procedures 



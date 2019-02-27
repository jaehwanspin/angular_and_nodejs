USE jaehwanspin;


DROP TABLE if EXISTS tbl_boardFile CASCADE;
DROP TABLE if EXISTS tbl_file CASCADE;
DROP TABLE if EXISTS tbl_comment CASCADE;
DROP TABLE IF EXISTS tbl_board CASCADE;
DROP TABLE IF EXISTS tbl_user CASCADE;


CREATE TABLE tbl_user (

    usNo 			INT 			  	NOT NULL	AUTO_INCREMENT		
  , usId 			VARCHAR(100)	NOT NULL	UNIQUE
  , usPass 			CHAR(255) 		NOT NULL
  , usEmail 		VARCHAR(255) 	NOT NULL UNIQUE
  , usName 			VARCHAR(30) 	NULL
  , regDate 		DATETIME			NOT NULL DEFAULT NOW()
  , modDate 		DATETIME 		NULL
  , remDate 		DATETIME 		NULL
  
  , CONSTRAINT pk_user_usNo PRIMARY KEY(usNo)
  
)
;


CREATE TABLE tbl_board (
	
	 boNo 			INT 				NOT NULL AUTO_INCREMENT
  , boTitle 		VARCHAR(255) 	NOT NULL
  , boContent 		TEXT 				NOT NULL
  , readCount 		INT 				NOT NULL DEFAULT 0
  , recomCount 	INT 				NOT NULL DEFAULT 0
  , writer 			INT 				NOT NULL
  , regDate			DATETIME			NOT NULL DEFAULT NOW()
  , modDate			DATETIME 		NULL
  , remDate			DATETIME			NULL
  
  , CONSTRAINT pk_board_boNo PRIMARY KEY(boNo)
  , CONSTRAINT fk_board_writer FOREIGN KEY(writer)
  	 	REFERENCES tbl_user(usNo) ON DELETE CASCADE
  	 	
)
;


CREATE TABLE tbl_comment (

    comNo			INT				NOT NULL AUTO_INCREMENT
  , comContent 	TEXT				NOT NULL
  , writer 			INT			 	NOT NULL
  , regDate 		DATETIME 		NOT NULL DEFAULT NOW()
  , modDate 		DATETIME 		NULL
  , remDate 		DATETIME 		NULL
  
  , CONSTRAINT pk_comment_comNo PRIMARY KEY(comNo)
  , CONSTRAINT fk_comment_writer FOREIGN KEY(writer)
		REFERENCES tbl_user(usNo) ON DELETE CASCADE
  
);


CREATE TABLE tbl_file (

	 fileNo 			INT 				NOT NULL AUTO_INCREMENT
  , fileName 		VARCHAR(255) 	NOT NULL
  , fileDir 		VARCHAR(255) 	NOT NULL
  , fileExt 		VARCHAR(255) 	NULL
  , fileAvailable BOOL 				NOT NULL DEFAULT 1
#  , 
  , CONSTRAINT pk_file_fileNo PRIMARY KEY(fileNo)
  
)
;


CREATE TABLE tbl_boardFile (
	 
	 fileNo 			INT 				NOT NULL
  , boNo 			INT 				NOT NULL
  
  , CONSTRAINT pk_boardFile_fileNo_boNo PRIMARY KEY(fileNo, boNo)
  , CONSTRAINT fk_boardFile_fileNo FOREIGN KEY(fileNo)
  	 	REFERENCES tbl_file(fileNo) ON DELETE CASCADE
  , CONSTRAINT fk_boardFile_boNo FOREIGN KEY(boNo)
  	 	REFERENCES tbl_board(boNo) ON DELETE CASCADE

);


COMMIT;
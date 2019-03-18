DROP DATABASE IF EXISTS jaehwanspin;
CREATE DATABASE jaehwanspin CHARACTER SET 'utf8' COLLATE 'utf8_bin';
USE jaehwanspin;

DROP VIEW IF EXISTS vw_normaluser;
DROP VIEW IF EXISTS vw_normalboard;
DROP VIEW IF EXISTS vw_normalcomment;
DROP VIEW IF EXISTS vw_normalfile;

DROP TABLE IF EXISTS tbl_boardFile CASCADE;
DROP TABLE IF EXISTS tbl_file CASCADE;
DROP TABLE IF EXISTS tbl_comment CASCADE;
DROP TABLE IF EXISTS tbl_board CASCADE;
DROP TABLE if EXISTS tbl_category CASCADE;
DROP TABLE IF EXISTS tbl_user CASCADE;


# 사용자
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
  , CONSTRAINT uq_user_usId UNIQUE(usId)
  , CONSTRAINT uq_user_usEmail UNIQUE(usEmail)
  
)
;


CREATE TABLE tbl_category (

    catNo			INT				NOT NULL AUTO_INCREMENT
  , catName			VARCHAR(255)	NOT NULL
  , catAvailable	BOOL				NOT NULL DEFAULT 1
  
  , CONSTRAINT pk_category_catNo PRIMARY KEY(catNo)
  , CONSTRAINT uq_category_catName UNIQUE(catName)

)
;


# 게시판
CREATE TABLE tbl_board (
	
	 boNo 			INT 				NOT NULL AUTO_INCREMENT
  , catNo			INT				NOT NULL
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
  , CONSTRAINT fk_board_catNo FOREIGN KEY(catNo)
  	 	REFERENCES tbl_category(catNo) ON DELETE CASCADE
  	 	
)
;


# 댓글
CREATE TABLE tbl_comment (

    comNo			INT				NOT NULL AUTO_INCREMENT
  , boNo				INT				NOT NULL
  , comContent 	TEXT				NOT NULL
  , writer 			INT			 	NOT NULL
  , regDate 		DATETIME 		NOT NULL DEFAULT NOW()
  , modDate 		DATETIME 		NULL
  , remDate 		DATETIME 		NULL
  
  , CONSTRAINT pk_comment_comNo PRIMARY KEY(comNo)
  , CONSTRAINT fk_comment_writer FOREIGN KEY(writer)
		REFERENCES tbl_user(usNo) ON DELETE CASCADE
  , CONSTRAINT fk_comment_boNo FOREIGN KEY(boNo)
		REFERENCES tbl_board(boNo) ON DELETE CASCADE
  
);


# 파일
CREATE TABLE tbl_file (

	 fileNo 			INT 				NOT NULL AUTO_INCREMENT
  , fileName 		VARCHAR(255) 	NOT NULL
  , fileDir 		VARCHAR(255) 	NOT NULL
  , fileExt 		VARCHAR(255) 	NULL
  , fileAvailable BOOL 				NOT NULL DEFAULT 1
 
  , CONSTRAINT pk_file_fileNo PRIMARY KEY(fileNo)
  
)
;


# 게시판 파일
CREATE TABLE tbl_boardFile (
	 
	 fileNo 			INT 				NOT NULL
  , boNo 			INT 				NOT NULL
  
  , CONSTRAINT pk_boardFile_fileNo_boNo PRIMARY KEY(fileNo, boNo)
  , CONSTRAINT fk_boardFile_fileNo FOREIGN KEY(fileNo)
  	 	REFERENCES tbl_file(fileNo) ON DELETE CASCADE
  , CONSTRAINT fk_boardFile_boNo FOREIGN KEY(boNo)
  	 	REFERENCES tbl_board(boNo) ON DELETE CASCADE

);


CREATE OR REPLACE SQL SECURITY INVOKER VIEW vw_normaluser
	AS SELECT usNo
	        , usId
	        , usEmail
	        , usName
	        , regDate
	        , modDate
	     FROM tbl_user
	    WHERE remDate IS NULL
;


CREATE OR REPLACE SQL SECURITY INVOKER VIEW vw_normalcategory
	AS SELECT catNo
	        , catName
	     FROM tbl_category
	    WHERE catAvailable = 1
;


CREATE OR REPLACE SQL SECURITY INVOKER VIEW vw_normalboard
	AS SELECT b.boNo
           , c.catNo
           , c.catName
			  , b.boTitle
			  , b.boContent
   		  , b.readCount
   		  , b.recomCount
   		  , u.usNo
		     , u.usId
		     , u.usEmail
		     , u.usName
			  , b.regDate
		     , b.modDate
        FROM (SELECT *
		          FROM tbl_board
				   WHERE remDate IS NULL) b
        JOIN tbl_user u 
          ON b.writer = u.usNo
        JOIN vw_normalcategory c
          ON b.catNo = c.catNo
       ORDER BY b.boNo DESC
;


CREATE OR REPLACE SQL SECURITY INVOKER VIEW vw_normalcomment
	AS SELECT c.comNo
			  , c.boNo
	        , c.comContent
	        , u.usNo
		     , u.usId
		     , u.usEmail
		     , u.usName
	        , c.regDate
	        , c.modDate
		  FROM (SELECT *
		          FROM tbl_comment
					WHERE remDate IS NULL) c
		  JOIN tbl_user u
		    ON c.writer = u.usNo
		 ORDER BY c.comNo ASC
;


CREATE OR REPLACE SQL SECURITY INVOKER VIEW vw_normalfile
	AS SELECT fileNo
	        , fileName
	        , fileDir
	        , fileExt
  	     FROM tbl_file
  	    WHERE fileAvailable = 1
;


CREATE OR REPLACE SQL SECURITY INVOKER VIEW vw_normalboardfile
	AS SELECT b.boNo
	        , f.fileNo
	        , f.fileName
	        , f.fileDir
	        , f.fileExt
	     FROM tbl_boardFile bf
		  JOIN vw_normalboard b
		    ON bf.boNo = b.boNo
		  JOIN vw_normalfile f
		    ON bf.fileNo = f.fileNo
;

COMMIT;


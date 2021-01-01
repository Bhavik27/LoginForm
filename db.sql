IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'TestDB' ) /*YOU CAN CHANGE DB NAME BASED ON config/db.js*/
    BEGIN
        CREATE DATABASE [TestDB]
    END
GO
    USE [TestDB]
GO

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name = 'LoginMaster' )
    BEGIN
        CREATE TABLE [LoginMaster](
        [Id] [int] IDENTITY(1,1) NOT NULL,
        [Name] [varchar](50) NULL,
        [Email] [varchar](50) NULL,
        [Password] [varchar](50) NULL,
        [Date] [date] NULL DEFAULT (getdate()),
        )

    END



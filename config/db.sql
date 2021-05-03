CREATE DATABASE locpanel;
GO

USE locpanel;
GO

DROP TABLE IF EXISTS tbllocpanelrooms;
CREATE TABLE tbllocpanelrooms (
    [id] [int] IDENTITY(1,1) PRIMARY KEY CLUSTERED NOT NULL,
    [name] [nvarchar](50) NOT NULL,
    [columns] [nvarchar](255) NOT NULL,
    INDEX idx_tbllocpanelrooms_name ( [name] )
)
GO

DROP TABLE IF EXISTS tbllocpanelcards;
CREATE TABLE tbllocpanelcards (
    [id] [int] IDENTITY(1,1) PRIMARY KEY CLUSTERED NOT NULL,
    [extidroom] [int] NOT NULL,
    [isActive] [bit] NOT NULL,
    [isAdmin] [bit] NOT NULL,
    [KID] [nvarchar](20) NOT NULL,
    [text] [nvarchar](255),
    [x] [real] NOT NULL,
    [y] [real] NOT NULL,
    [x2] [real],
    [y2] [real],
    [x3] [real],
    [y3] [real],
    [x4] [real],
    [y4] [real],
    [x5] [real],
    [y5] [real],
    [rot] [int] NOT NULL,
    [colour] [nvarchar](20) NOT NULL,
    INDEX idx_tbllocpanelcards_id ( [id] )
)
GO

ALTER TABLE tbllocpanelcards WITH CHECK ADD CONSTRAINT [FK_tbllocpanelrooms_id_tbllocpanelcards_extidroom] FOREIGN KEY([extidroom])
REFERENCES tbllocpanelrooms ([id])
ON DELETE CASCADE
GO

ALTER TABLE tbllocpanelcards ADD CONSTRAINT [DF_tbllocpanelcards_isActive] DEFAULT ((1)) FOR [isActive];
GO

ALTER TABLE tbllocpanelcards ADD CONSTRAINT [DF_tbllocpanelcards_isAdmin] DEFAULT ((0)) FOR [isAdmin];
GO

ALTER TABLE tbllocpanelcards ADD CONSTRAINT [DF_tbllocpanelcards_x] DEFAULT ((300.0)) FOR [x];
GO

ALTER TABLE tbllocpanelcards ADD CONSTRAINT [DF_tbllocpanelcards_y] DEFAULT ((300.0)) FOR [y];
GO

ALTER TABLE tbllocpanelcards ADD CONSTRAINT [DF_tbllocpanelcards_rot] DEFAULT ((0)) FOR [rot];
GO

ALTER TABLE tbllocpanelcards ADD CONSTRAINT [DF_tbllocpanelcards_colour] DEFAULT (('white')) FOR [colour];
GO


/* SEEDS */
INSERT INTO tbllocpanelrooms ([name], [columns]) VALUES ('/abcdef', 'Location 1, Location 2, Location 3, Out of Order');

INSERT INTO tbllocpanelcards ([extidroom], [KID], [text], [x], [y], [rot], [colour]) VALUES (1, '1234', '<b>1234</b>', 250.0, 250.0, -1, 'yellow');
INSERT INTO tbllocpanelcards ([extidroom], [KID], [text], [x], [y], [rot], [colour]) VALUES (1, '2345', '<b>2345</b>', 300.0, 300.0, 0, 'white');
INSERT INTO tbllocpanelcards ([extidroom], [KID], [text], [x], [y], [rot], [colour]) VALUES (1, '3456', '<b>3456</b>', 350.0, 350.0, 1, 'green');

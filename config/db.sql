CREATE DATABASE locpanel;
GO

USE locpanel;
GO

DROP TABLE IF EXISTS tblLOCPANEL_rooms;
CREATE TABLE tblLOCPANEL_rooms (
    [id] [int] IDENTITY(1,1) PRIMARY KEY CLUSTERED NOT NULL,
    [name] [nvarchar](50) NOT NULL,
    [columns] [nvarchar](255) NOT NULL,
    INDEX idx_tblLOCPANEL_rooms_name ( [name] )
)
GO

DROP TABLE IF EXISTS tblLOCPANEL_cards;
CREATE TABLE tblLOCPANEL_cards (
    [id] [int] IDENTITY(1,1) PRIMARY KEY CLUSTERED NOT NULL,
    [extidroom] [int] NOT NULL,
    [isActive] [bit] NOT NULL,
    [isAdmin] [bit] NOT NULL,
    [idUser] [nvarchar](20) NOT NULL,
    [text] [nvarchar](255),
    [x1] [real] NOT NULL,
    [y1] [real] NOT NULL,
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
    INDEX idx_tblLOCPANEL_cards_id ( [id] )
)
GO

ALTER TABLE tblLOCPANEL_cards WITH CHECK ADD CONSTRAINT [FK_tblLOCPANEL_rooms_id_tblLOCPANEL_cards_extidroom] FOREIGN KEY([extidroom])
REFERENCES tblLOCPANEL_rooms ([id])
ON DELETE CASCADE
GO

ALTER TABLE tblLOCPANEL_cards ADD CONSTRAINT [DF_tblLOCPANEL_cards_isActive] DEFAULT ((1)) FOR [isActive];
GO

ALTER TABLE tblLOCPANEL_cards ADD CONSTRAINT [DF_tblLOCPANEL_cards_isAdmin] DEFAULT ((0)) FOR [isAdmin];
GO

ALTER TABLE tblLOCPANEL_cards ADD CONSTRAINT [DF_tblLOCPANEL_cards_x1] DEFAULT ((300.0)) FOR [x1];
GO

ALTER TABLE tblLOCPANEL_cards ADD CONSTRAINT [DF_tblLOCPANEL_cards_y1] DEFAULT ((300.0)) FOR [y1];
GO

ALTER TABLE tblLOCPANEL_cards ADD CONSTRAINT [DF_tblLOCPANEL_cards_rot] DEFAULT ((0)) FOR [rot];
GO

ALTER TABLE tblLOCPANEL_cards ADD CONSTRAINT [DF_tblLOCPANEL_cards_colour] DEFAULT (('white')) FOR [colour];
GO


/* SEEDS */
INSERT INTO tblLOCPANEL_rooms ([name], [columns]) VALUES ('/abcdef', 'Location 1, Location 2, Location 3, Out of Order');

INSERT INTO tblLOCPANEL_cards ([extidroom], [idUser], [text], [x1], [y1], [rot], [colour]) VALUES (1, '1234', '<b>1234</b>', 250.0, 250.0, -1, 'yellow');
INSERT INTO tblLOCPANEL_cards ([extidroom], [idUser], [text], [x1], [y1], [rot], [colour]) VALUES (1, '2345', '<b>2345</b>', 300.0, 300.0, 0, 'white');
INSERT INTO tblLOCPANEL_cards ([extidroom], [idUser], [text], [x1], [y1], [rot], [colour]) VALUES (1, '3456', '<b>3456</b>', 350.0, 350.0, 1, 'green');

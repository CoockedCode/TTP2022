-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2022-06-19 06:13:04.588

-- tables
-- Table: arve_info
CREATE TABLE arve_info (
    id int NOT NULL AUTO_INCREMENT,
    projekt_id int NOT NULL,
    pakkumise_nr varchar(255) NOT NULL,
    kokkulep_hind varchar(255) NOT NULL,
    kliendi_po_nr varchar(255) NOT NULL,
    lepingu_nr varchar(255) NOT NULL,
    tellimuse_esitaja varchar(255) NOT NULL,
    telefon_nr varchar(255) NOT NULL,
    CONSTRAINT arve_info_pk PRIMARY KEY (id)
);

-- Table: firma
CREATE TABLE firma (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    tuup int NOT NULL,
    in_edit bool NOT NULL,
    deleted bool NOT NULL,
    CONSTRAINT firma_pk PRIMARY KEY (id)
);

-- Table: klient
CREATE TABLE klient (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    reg_nr varchar(255) NOT NULL,
    address varchar(255) NOT NULL,
    posti_indeks int NOT NULL,
    kontakt_isik varchar(255) NOT NULL,
    e_mail varchar(255) NOT NULL,
    telefon varchar(255) NOT NULL,
    arve_email varchar(255) NOT NULL,
    lisa_info varchar(1000) NOT NULL,
    deleted bool NOT NULL,
    in_edit bool NOT NULL,
    CONSTRAINT klient_pk PRIMARY KEY (id)
);

-- Table: kulud
CREATE TABLE kulud (
    id int NOT NULL AUTO_INCREMENT,
    projekt_id int NOT NULL,
    arve_nr varchar(255) NOT NULL,
    hind_kliendile varchar(255) NOT NULL,
    in_edit bool NOT NULL,
    deleted bool NOT NULL,
    CONSTRAINT kulud_pk PRIMARY KEY (id)
);

-- Table: kulud_arvega
CREATE TABLE kulud_arvega (
    id int NOT NULL AUTO_INCREMENT,
    ostud_arvega_id int NOT NULL,
    kulud_id int NOT NULL,
    in_edit bool NOT NULL,
    deleted bool NOT NULL,
    CONSTRAINT kulud_arvega_pk PRIMARY KEY (id)
);

-- Table: ladu
CREATE TABLE ladu (
    id int NOT NULL AUTO_INCREMENT,
    nimetus varchar(255) NOT NULL,
    tuup varchar(255) NOT NULL,
    uhiku_hind decimal(8,4) NOT NULL,
    in_edit bool NOT NULL,
    deleted bool NOT NULL,
    CONSTRAINT ladu_pk PRIMARY KEY (id)
);

-- Table: laost_materjal
CREATE TABLE laost_materjal (
    id int NOT NULL AUTO_INCREMENT,
    kulud_id int NOT NULL,
    ladu_id int NOT NULL,
    kogus int NOT NULL,
    in_edit bool NOT NULL,
    deleted bool NOT NULL,
    CONSTRAINT laost_materjal_pk PRIMARY KEY (id)
);

-- Table: media
CREATE TABLE media (
    id int NOT NULL AUTO_INCREMENT,
    projekt_id int NOT NULL,
    href varchar(1000) NOT NULL,
    type varchar(24) NOT NULL,
    deleted bool NOT NULL,
    in_edit bool NOT NULL,
    CONSTRAINT media_pk PRIMARY KEY (id)
);

-- Table: ostud_arvega
CREATE TABLE ostud_arvega (
    id int NOT NULL AUTO_INCREMENT,
    nimetus varchar(255) NOT NULL,
    firma_id int NOT NULL,
    saateleht varchar(255) NOT NULL,
    arve_nr varchar(255) NOT NULL,
    kuupaev date NOT NULL,
    summa decimal(10,4) NOT NULL,
    in_edit bool NOT NULL,
    deleted bool NOT NULL,
    CONSTRAINT ostud_arvega_pk PRIMARY KEY (id)
);

-- Table: progress
CREATE TABLE progress (
    id int NOT NULL AUTO_INCREMENT,
    algus timestamp NOT NULL,
    lopp timestamp NULL,
    tooetapp_too_liigis_id int NOT NULL,
    seade_projektis_id int NOT NULL,
    tootaja_roll_id int NOT NULL,
    deleted bool NOT NULL,
    in_edit bool NOT NULL,
    CONSTRAINT progress_pk PRIMARY KEY (id)
);

-- Table: projekt
CREATE TABLE projekt (
    id int NOT NULL AUTO_INCREMENT,
    projekt_nr varchar(255) NOT NULL,
    prioriteet int NOT NULL,
    alustatud date NOT NULL,
    klient_id int NOT NULL,
    kokkulepitud_lopp date NOT NULL,
    lopp date NULL,
    valjaviidud date NULL,
    arve bool NOT NULL,
    saabunud varchar(255) NOT NULL,
    tagastus varchar(255) NULL,
    teostatav bool NOT NULL,
    vottis_vastu varchar(255) NOT NULL,
    arhiivi bool NOT NULL,
    in_edit bool NOT NULL,
    deleted bool NOT NULL,
    CONSTRAINT id PRIMARY KEY (id)
);

-- Table: roll
CREATE TABLE roll (
    id int NOT NULL AUTO_INCREMENT,
    rolli_nimi varchar(100) NOT NULL,
    deleted bool NOT NULL,
    in_edit bool NOT NULL DEFAULT false,
    CONSTRAINT roll_pk PRIMARY KEY (id)
);

-- Table: seade
CREATE TABLE seade (
    id int NOT NULL AUTO_INCREMENT,
    tuup varchar(255) NOT NULL,
    seriaali_number varchar(255) NOT NULL,
    tootja varchar(255) NOT NULL,
    deleted bool NOT NULL,
    in_edit bool NOT NULL,
    CONSTRAINT seade_pk PRIMARY KEY (id)
);

-- Table: seade_projektis
CREATE TABLE seade_projektis (
    id int NOT NULL AUTO_INCREMENT,
    seade_id int NOT NULL,
    projekt_id int NOT NULL,
    deleted bool NOT NULL,
    in_edit bool NOT NULL,
    CONSTRAINT seade_projektis_pk PRIMARY KEY (id)
);

-- Table: tehniline_info
CREATE TABLE tehniline_info (
    id int NOT NULL AUTO_INCREMENT,
    seade_id int NOT NULL,
    nimetus varchar(255) NOT NULL,
    andmed json NOT NULL,
    deleted bool NOT NULL,
    in_edit bool NOT NULL,
    CONSTRAINT tehniline_info_pk PRIMARY KEY (id)
);

-- Table: too_liik
CREATE TABLE too_liik (
    id int NOT NULL AUTO_INCREMENT,
    nimetus varchar(255) NOT NULL,
    lisatud timestamp NOT NULL,
    tootaja_roll_id int NOT NULL,
    deleted bool NOT NULL,
    in_edit bool NOT NULL,
    CONSTRAINT too_liik_pk PRIMARY KEY (id)
);

-- Table: toode_tunnid
CREATE TABLE toode_tunnid (
    id int NOT NULL AUTO_INCREMENT,
    projekt_id int NOT NULL,
    kokku_h double(6,2) NOT NULL,
    kokku_norm_h double(6,2) NOT NULL,
    kokku_ule_h double(6,2) NOT NULL,
    in_edit bool NOT NULL,
    deleted bool NOT NULL,
    CONSTRAINT toode_tunnid_pk PRIMARY KEY (id)
);

-- Table: tooetapi_nimetus
CREATE TABLE tooetapi_nimetus (
    id int NOT NULL AUTO_INCREMENT,
    nimetus varchar(255) NOT NULL,
    lisatud timestamp NOT NULL,
    tootaja_roll_id int NOT NULL,
    luhinimetus varchar(255) NOT NULL,
    deleted bool NOT NULL,
    in_edit bool NOT NULL,
    CONSTRAINT tooetapi_nimetus_pk PRIMARY KEY (id)
);

-- Table: tooetapp_too_liigis
CREATE TABLE tooetapp_too_liigis (
    id int NOT NULL AUTO_INCREMENT,
    too_liik_id int NOT NULL,
    tooetapi_nimetus_id int NOT NULL,
    samm varchar(125) NOT NULL,
    deleted bool NOT NULL,
    in_edit bool NOT NULL,
    CONSTRAINT tooetapp_too_liigis_pk PRIMARY KEY (id)
);

-- Table: tootaja
CREATE TABLE tootaja (
    id int NOT NULL AUTO_INCREMENT,
    eesnimi varchar(255) NOT NULL,
    perekonnanimi varchar(255) NOT NULL,
    user_name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    palgal bool NOT NULL,
    in_edit bool NOT NULL,
    CONSTRAINT tootaja_pk PRIMARY KEY (id)
);

-- Table: tootaja_roll
CREATE TABLE tootaja_roll (
    id int NOT NULL AUTO_INCREMENT,
    tootaja_id int NOT NULL,
    roll_id int NOT NULL,
    deleted bool NOT NULL,
    in_edit bool NOT NULL,
    CONSTRAINT tootaja_roll_pk PRIMARY KEY (id)
);

-- Table: tootajate_tunnid
CREATE TABLE tootajate_tunnid (
    id int NOT NULL AUTO_INCREMENT,
    toode_tunnid_id int NOT NULL,
    tootaja_id int NOT NULL,
    tooetapi_nimetus_id int NOT NULL,
    kuupaev date NOT NULL,
    norm_h double(6,2) NOT NULL,
    ule_h double(6,2) NULL,
    in_edit bool NOT NULL,
    deleted bool NOT NULL,
    CONSTRAINT tootajate_tunnid_pk PRIMARY KEY (id)
);

-- Table: transport
CREATE TABLE transport (
    id int NOT NULL AUTO_INCREMENT,
    projekt_id int NOT NULL,
    firma_id int NOT NULL,
    suund int NOT NULL,
    CONSTRAINT transport_pk PRIMARY KEY (id)
);

-- Table: vaartused
CREATE TABLE vaartused (
    id int NOT NULL AUTO_INCREMENT,
    vaartus varchar(1000) NOT NULL,
    uhik int NULL,
    seade_id int NOT NULL,
    valikute_nimetus_id int NOT NULL,
    deleted bool NOT NULL,
    in_edit bool NOT NULL,
    CONSTRAINT vaartused_pk PRIMARY KEY (id)
);

-- Table: valikute_nimetus
CREATE TABLE valikute_nimetus (
    id int NOT NULL AUTO_INCREMENT,
    nimetus varchar(255) NOT NULL,
    deleted bool NOT NULL,
    in_edit bool NOT NULL,
    CONSTRAINT valikute_nimetus_pk PRIMARY KEY (id)
);

-- Table: valikute_vaartused
CREATE TABLE valikute_vaartused (
    id int NOT NULL AUTO_INCREMENT,
    vaartus varchar(255) NOT NULL,
    uhik char(10) NULL,
    markused varchar(1000) NULL,
    valikute_nimetus_id int NOT NULL,
    deleted bool NOT NULL,
    in_edit bool NOT NULL,
    CONSTRAINT valikute_vaartused_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: Table_39_toode_tunnid (table: tootajate_tunnid)
ALTER TABLE tootajate_tunnid ADD CONSTRAINT Table_39_toode_tunnid FOREIGN KEY Table_39_toode_tunnid (toode_tunnid_id)
    REFERENCES toode_tunnid (id);

-- Reference: arve_info_projekt (table: arve_info)
ALTER TABLE arve_info ADD CONSTRAINT arve_info_projekt FOREIGN KEY arve_info_projekt (projekt_id)
    REFERENCES projekt (id);

-- Reference: kulud_arvega_kulud (table: kulud_arvega)
ALTER TABLE kulud_arvega ADD CONSTRAINT kulud_arvega_kulud FOREIGN KEY kulud_arvega_kulud (kulud_id)
    REFERENCES kulud (id);

-- Reference: kulud_arvega_ostud_arvega (table: kulud_arvega)
ALTER TABLE kulud_arvega ADD CONSTRAINT kulud_arvega_ostud_arvega FOREIGN KEY kulud_arvega_ostud_arvega (ostud_arvega_id)
    REFERENCES ostud_arvega (id);

-- Reference: kulud_arvega_transpordi_firma (table: ostud_arvega)
ALTER TABLE ostud_arvega ADD CONSTRAINT kulud_arvega_transpordi_firma FOREIGN KEY kulud_arvega_transpordi_firma (firma_id)
    REFERENCES firma (id);

-- Reference: kulud_projekt (table: kulud)
ALTER TABLE kulud ADD CONSTRAINT kulud_projekt FOREIGN KEY kulud_projekt (projekt_id)
    REFERENCES projekt (id);

-- Reference: laost_materjal_kulud (table: laost_materjal)
ALTER TABLE laost_materjal ADD CONSTRAINT laost_materjal_kulud FOREIGN KEY laost_materjal_kulud (kulud_id)
    REFERENCES kulud (id);

-- Reference: laost_materjal_ladu (table: laost_materjal)
ALTER TABLE laost_materjal ADD CONSTRAINT laost_materjal_ladu FOREIGN KEY laost_materjal_ladu (ladu_id)
    REFERENCES ladu (id);

-- Reference: lisa_andmed_Seade (table: tehniline_info)
ALTER TABLE tehniline_info ADD CONSTRAINT lisa_andmed_Seade FOREIGN KEY lisa_andmed_Seade (seade_id)
    REFERENCES seade (id);

-- Reference: media_projekt (table: media)
ALTER TABLE media ADD CONSTRAINT media_projekt FOREIGN KEY media_projekt (projekt_id)
    REFERENCES projekt (id);

-- Reference: progress_seade_projektis (table: progress)
ALTER TABLE progress ADD CONSTRAINT progress_seade_projektis FOREIGN KEY progress_seade_projektis (seade_projektis_id)
    REFERENCES seade_projektis (id);

-- Reference: progress_tooetapp (table: progress)
ALTER TABLE progress ADD CONSTRAINT progress_tooetapp FOREIGN KEY progress_tooetapp (tooetapp_too_liigis_id)
    REFERENCES tooetapp_too_liigis (id);

-- Reference: progress_tootaja_roll (table: progress)
ALTER TABLE progress ADD CONSTRAINT progress_tootaja_roll FOREIGN KEY progress_tootaja_roll (tootaja_roll_id)
    REFERENCES tootaja_roll (id);

-- Reference: project_client (table: projekt)
ALTER TABLE projekt ADD CONSTRAINT project_client FOREIGN KEY project_client (klient_id)
    REFERENCES klient (id);

-- Reference: project_job_stage_too_nimetus (table: tooetapp_too_liigis)
ALTER TABLE tooetapp_too_liigis ADD CONSTRAINT project_job_stage_too_nimetus FOREIGN KEY project_job_stage_too_nimetus (too_liik_id)
    REFERENCES too_liik (id);

-- Reference: seade_projektis_Seade (table: seade_projektis)
ALTER TABLE seade_projektis ADD CONSTRAINT seade_projektis_Seade FOREIGN KEY seade_projektis_Seade (seade_id)
    REFERENCES seade (id);

-- Reference: seade_projektis_projekt (table: seade_projektis)
ALTER TABLE seade_projektis ADD CONSTRAINT seade_projektis_projekt FOREIGN KEY seade_projektis_projekt (projekt_id)
    REFERENCES projekt (id);

-- Reference: too_nimetus_tootaja_roll (table: too_liik)
ALTER TABLE too_liik ADD CONSTRAINT too_nimetus_tootaja_roll FOREIGN KEY too_nimetus_tootaja_roll (tootaja_roll_id)
    REFERENCES tootaja_roll (id);

-- Reference: toode_tunnid_projekt (table: toode_tunnid)
ALTER TABLE toode_tunnid ADD CONSTRAINT toode_tunnid_projekt FOREIGN KEY toode_tunnid_projekt (projekt_id)
    REFERENCES projekt (id);

-- Reference: tooetapi_nimetus_tootaja_roll (table: tooetapi_nimetus)
ALTER TABLE tooetapi_nimetus ADD CONSTRAINT tooetapi_nimetus_tootaja_roll FOREIGN KEY tooetapi_nimetus_tootaja_roll (tootaja_roll_id)
    REFERENCES tootaja_roll (id);

-- Reference: tooetapp_tooetapi_nimetus (table: tooetapp_too_liigis)
ALTER TABLE tooetapp_too_liigis ADD CONSTRAINT tooetapp_tooetapi_nimetus FOREIGN KEY tooetapp_tooetapi_nimetus (tooetapi_nimetus_id)
    REFERENCES tooetapi_nimetus (id);

-- Reference: tootaja_roll_roll (table: tootaja_roll)
ALTER TABLE tootaja_roll ADD CONSTRAINT tootaja_roll_roll FOREIGN KEY tootaja_roll_roll (roll_id)
    REFERENCES roll (id);

-- Reference: tootaja_roll_tootaja (table: tootaja_roll)
ALTER TABLE tootaja_roll ADD CONSTRAINT tootaja_roll_tootaja FOREIGN KEY tootaja_roll_tootaja (tootaja_id)
    REFERENCES tootaja (id);

-- Reference: tootajate_tunnid_tooetapi_nimetus (table: tootajate_tunnid)
ALTER TABLE tootajate_tunnid ADD CONSTRAINT tootajate_tunnid_tooetapi_nimetus FOREIGN KEY tootajate_tunnid_tooetapi_nimetus (tooetapi_nimetus_id)
    REFERENCES tooetapi_nimetus (id);

-- Reference: tootajate_tunnid_tootaja (table: tootajate_tunnid)
ALTER TABLE tootajate_tunnid ADD CONSTRAINT tootajate_tunnid_tootaja FOREIGN KEY tootajate_tunnid_tootaja (tootaja_id)
    REFERENCES tootaja (id);

-- Reference: transport_projekt (table: transport)
ALTER TABLE transport ADD CONSTRAINT transport_projekt FOREIGN KEY transport_projekt (projekt_id)
    REFERENCES projekt (id);

-- Reference: transport_transpordi_firma (table: transport)
ALTER TABLE transport ADD CONSTRAINT transport_transpordi_firma FOREIGN KEY transport_transpordi_firma (firma_id)
    REFERENCES firma (id);

-- Reference: vaartused_Seade (table: vaartused)
ALTER TABLE vaartused ADD CONSTRAINT vaartused_Seade FOREIGN KEY vaartused_Seade (seade_id)
    REFERENCES seade (id);

-- Reference: vaartused_valikute_teatmik (table: vaartused)
ALTER TABLE vaartused ADD CONSTRAINT vaartused_valikute_teatmik FOREIGN KEY vaartused_valikute_teatmik (valikute_nimetus_id)
    REFERENCES valikute_nimetus (id);

-- Reference: valikute_vaartused_valikute_teatmik (table: valikute_vaartused)
ALTER TABLE valikute_vaartused ADD CONSTRAINT valikute_vaartused_valikute_teatmik FOREIGN KEY valikute_vaartused_valikute_teatmik (valikute_nimetus_id)
    REFERENCES valikute_nimetus (id);

-- End of file.


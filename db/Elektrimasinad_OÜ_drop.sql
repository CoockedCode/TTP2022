-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2022-06-19 06:13:04.588

-- foreign keys
ALTER TABLE tootajate_tunnid
    DROP FOREIGN KEY Table_39_toode_tunnid;

ALTER TABLE arve_info
    DROP FOREIGN KEY arve_info_projekt;

ALTER TABLE kulud_arvega
    DROP FOREIGN KEY kulud_arvega_kulud;

ALTER TABLE kulud_arvega
    DROP FOREIGN KEY kulud_arvega_ostud_arvega;

ALTER TABLE ostud_arvega
    DROP FOREIGN KEY kulud_arvega_transpordi_firma;

ALTER TABLE kulud
    DROP FOREIGN KEY kulud_projekt;

ALTER TABLE laost_materjal
    DROP FOREIGN KEY laost_materjal_kulud;

ALTER TABLE laost_materjal
    DROP FOREIGN KEY laost_materjal_ladu;

ALTER TABLE tehniline_info
    DROP FOREIGN KEY lisa_andmed_Seade;

ALTER TABLE media
    DROP FOREIGN KEY media_projekt;

ALTER TABLE progress
    DROP FOREIGN KEY progress_seade_projektis;

ALTER TABLE progress
    DROP FOREIGN KEY progress_tooetapp;

ALTER TABLE progress
    DROP FOREIGN KEY progress_tootaja_roll;

ALTER TABLE projekt
    DROP FOREIGN KEY project_client;

ALTER TABLE tooetapp_too_liigis
    DROP FOREIGN KEY project_job_stage_too_nimetus;

ALTER TABLE seade_projektis
    DROP FOREIGN KEY seade_projektis_Seade;

ALTER TABLE seade_projektis
    DROP FOREIGN KEY seade_projektis_projekt;

ALTER TABLE too_liik
    DROP FOREIGN KEY too_nimetus_tootaja_roll;

ALTER TABLE toode_tunnid
    DROP FOREIGN KEY toode_tunnid_projekt;

ALTER TABLE tooetapi_nimetus
    DROP FOREIGN KEY tooetapi_nimetus_tootaja_roll;

ALTER TABLE tooetapp_too_liigis
    DROP FOREIGN KEY tooetapp_tooetapi_nimetus;

ALTER TABLE tootaja_roll
    DROP FOREIGN KEY tootaja_roll_roll;

ALTER TABLE tootaja_roll
    DROP FOREIGN KEY tootaja_roll_tootaja;

ALTER TABLE tootajate_tunnid
    DROP FOREIGN KEY tootajate_tunnid_tooetapi_nimetus;

ALTER TABLE tootajate_tunnid
    DROP FOREIGN KEY tootajate_tunnid_tootaja;

ALTER TABLE transport
    DROP FOREIGN KEY transport_projekt;

ALTER TABLE transport
    DROP FOREIGN KEY transport_transpordi_firma;

ALTER TABLE vaartused
    DROP FOREIGN KEY vaartused_Seade;

ALTER TABLE vaartused
    DROP FOREIGN KEY vaartused_valikute_teatmik;

ALTER TABLE valikute_vaartused
    DROP FOREIGN KEY valikute_vaartused_valikute_teatmik;

-- tables
DROP TABLE arve_info;

DROP TABLE firma;

DROP TABLE klient;

DROP TABLE kulud;

DROP TABLE kulud_arvega;

DROP TABLE ladu;

DROP TABLE laost_materjal;

DROP TABLE media;

DROP TABLE ostud_arvega;

DROP TABLE progress;

DROP TABLE projekt;

DROP TABLE roll;

DROP TABLE seade;

DROP TABLE seade_projektis;

DROP TABLE tehniline_info;

DROP TABLE too_liik;

DROP TABLE toode_tunnid;

DROP TABLE tooetapi_nimetus;

DROP TABLE tooetapp_too_liigis;

DROP TABLE tootaja;

DROP TABLE tootaja_roll;

DROP TABLE tootajate_tunnid;

DROP TABLE transport;

DROP TABLE vaartused;

DROP TABLE valikute_nimetus;

DROP TABLE valikute_vaartused;

-- End of file.


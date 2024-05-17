CREATE TABLE IF NOT EXISTS `elements_weather_app`.`sessions`(
    `session_id` VARCHAR(128) NOT NULL,
    `expires` INT NOT NULL,
    `data` MEDIUMTEXT,
    `location_ids` VARCHAR(255) NULL,
    PRIMARY KEY (`session_id`)
);

CREATE TABLE IF NOT EXISTS `elements_weather_app`.`locations`(
`location_id` IN NOT NULL,
`name` VARCHAR(45) NOT NULL ,
`state` VARCHAR(45) NOT NULL ,
`country_code` VARCHAR(45) NOT NULL ,
`latitude` DECIMAL(8,5) NOT NULL ,
`longitude` DECIMAL(8,5) NOT NULL ,
`fetch_url` VARCHAR(255) NULL, 
PRIMARY KEY (`location_id`));

CREATE TABLE IF NOT EXISTS `elements_weather_app`.`session_favorites`(
    `s_id` VARCHAR(128) NOT NULL,
    `l_id` INT NOT NULL,
    `l_name` VARCHAR(45) NULL,
);


INSERT INTO `elements_weather_app`.`locations` (
    `location_id`, 
    `session_id`, 
    `location`, 
    `latitude`, 
    `longitude`, 
    `fetch_url`) 
    VALUES (
        '5586437', 
        'FBFtOOVKbw7cRn3oYIWzyRzp-Sff6Y4V', 
        'Boise ID', 
        '43.6135', 
        '-116.20345', 
        'https://api.weather.gov/gridpoints/BOI/133,86/forecast');

-- Create Foreign key to link the location_id to session_id

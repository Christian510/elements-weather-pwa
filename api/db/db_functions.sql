-- Refactor this to relect current database schema
CREATE TABLE `elements_weather_app`.`locations`(
`location_id` IN NOT NULL,
`name` VARCHAR(45) NOT NULL ,
`state` VARCHAR(45) NOT NULL ,
`country_code` VARCHAR(45) NOT NULL ,
`latitude` DECIMAL(8,5) NOT NULL ,
`longitude` DECIMAL(8,5) NOT NULL ,
`fetch_url` VARCHAR(255) NULL, 
PRIMARY KEY (`location_id`));

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

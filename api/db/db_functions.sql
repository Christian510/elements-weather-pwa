CREATE TABLE `elements_weather_app`.`locations`(
`location_id` IN NOT NULL,
`location` VARCHAR(45) NOT NULL ,
`latitude` DECIMAL(10,8) NOT NULL ,
`longitude` DECIMAL(11,8) NOT NULL ,
`fetch_url` VARCHAR(255) NOT NULL , 
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
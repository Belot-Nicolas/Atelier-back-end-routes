create table motos (
     id int NOT NULL AUTO_INCREMENT,
     marqueVARCHAR(255) NOT NULL,
     modele VARCHAR(255) NOT NULL,
     prix FLOAT NOT NULL,
     primary key (id)
     );

insert into motos 
(marque, modele, prix)
 values
 ("Triumph", "Street Triple", 9800),
 ("KTM", "Duke", 6000),
 ("Royal Enfield", "Interceptor", 7990);
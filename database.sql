create database inventory;
use inventory;

create table products (
id int auto_increment primary key,
name varchar(255) not null,
price decimal(10,2) not null,
stock int not null default 0,
created_at timestamp default current_timestamp
);

create table orders (
id int auto_increment primary key,
customer_name varchar(255) not null,
status enum('PLACED', 'CANCELLED') default 'PLACED',
created_at timestamp default current_timestamp
);

create table order_items (
id int auto_increment primary key,
order_id int not null,
product_id int not null,
quantity int not null,
price decimal(10,2) not null,

foreign key (order_id)
references orders(id)
on delete cascade,

foreign key (product_id)
references products(id)
);

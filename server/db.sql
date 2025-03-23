create table task (
    id serial primary key,
    description varchar(255) not null
);

insert into task (description) values ('My new task');
insert into task (description) values ('My another task');
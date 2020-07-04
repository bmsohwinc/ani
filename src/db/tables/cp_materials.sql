create table cpmaterials (
    matid int primary key,
    pid int,
    matlink varchar(200),
    foreign key (pid) references cpnotes(pid) on delete cascade
);
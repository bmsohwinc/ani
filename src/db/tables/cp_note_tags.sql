create table cpnotetags (
    tagid int primary key,
    pid int,
    foreign key (pid) references cpnotes(pid) on delete cascade,
    foreign key (tagid) references cptags(tagid) on delete cascade
);
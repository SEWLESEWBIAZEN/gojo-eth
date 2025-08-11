feedback ={
id:string
description:string
rating:number
menu?:id of menu
}
category={
    id:string,
    name:string
}

dish =  {
    id:string
    name:string
    description:string
    rating:string
    category:id of category
    image:file
}
message={
    id:string
    name:string
    email:string
    message:string
}

// reserve table
order={
    id:string
    dishId:id of dish
    amount:number
    date:DateTime
    status:enum ["requested","Accepted", "Completed"]
}



create table categories(  
id uuid primary key default uuid_generate_v4(),
name text not null,
badge text 
);

create table dishes (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  rating numeric default 0,
  category_id uuid references categories(id),
  image_url text
);

create table feedback (
  id uuid primary key default uuid_generate_v4(),
  description text not null,
  rating int not null,
  dish_id uuid references dishes(id)
);

create table messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamp default now()
);

create type order_status as enum ('requested', 'accepted', 'completed');

create table orders (
  id uuid primary key default uuid_generate_v4(),
  dish_id uuid references dishes(id),
  amount int not null,
  date timestamp not null,
  status order_status not null default 'requested'
);

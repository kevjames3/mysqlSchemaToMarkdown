<!--- This output was generated automatically.  Take care when editing.-->
# `mysqlSchemaToMarkDown_SampleData` Schema Description

Welcome to my over-arching analysis of my tables!

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales urna in eros laoreet, vitae auctor risus elementum. Quisque auctor ut lorem ut finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc molestie interdum odio, a condimentum turpis feugiat sed. Aliquam erat volutpat. Maecenas ante nisl, dignissim in odio non, molestie feugiat purus. In sed ultrices urna.
# `house`

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales urna in eros laoreet, vitae auctor risus elementum. Quisque auctor ut lorem ut finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc molestie interdum odio, a condimentum turpis feugiat sed. Aliquam erat volutpat. Maecenas ante nisl, dignissim in odio non, molestie feugiat purus. In sed ultrices urna.

| Field | Comment | Type | Null | Key | Default |
| --- | --- | --- | --- | --- | --- |
| id | Primary key of the house | int(11) | NO | PRI | null |
| address | This is the address of the house | varchar(5) | NO |  | null |
| sale_status |  | enum(<br />'not for sale',<br />'on sale',<br />'pending',<br />'to be sold') | NO |  | null |
| square_feet | This is the size of the house | int(11) | NO |  | null |


# `pet`

We made some liberties with this table.  Eventually the table will expand, but for now we are considering
* Reason 1
* Reason 2
* Reason 3

As you can see, I like my reasons 

| Field | Comment | Type | Null | Key | Default |
| --- | --- | --- | --- | --- | --- |
| id | Primary key of the pet | int(11) | NO | PRI | null |
| house_id | This references the key of the house | int(11) | NO | MUL | null |
| name | This is a comment about the name | varchar(20) | NO |  | null |
| owner | This is a comment about the owner | varchar(20) | NO |  | null |
| species | This is a comment about the species | varchar(20) | NO |  | null |
| sex | This is a comment about the sex | char(1) | NO |  | null |
| birth | This is a comment about the birth | date | NO |  | null |
| death | This is a comment about the date of the death | date | YES |  | null |

This concludes the description.  Remember to spay and neuter your pets everyone!


This concludes my choices.
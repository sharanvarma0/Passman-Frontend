This is the code for my PassMan project and represents the front end part. As of now, still a work in progress. The main framework used is React JS. You may find all the components
in specific files in the components folder. I have included a brief description about all the components here. They follow.

Description: Display information about the passman project, setup instructions and login button.
             Location: ./components/description.js

AuthComponent: Handle user authentication to the /users/ endpoint of the backend API. 
               Location: ./components/authcomponent.js

Vault: Handle vault specific logic like listing vaults, creating vaults and fetching records from vaults.
       Location: ./components/vault.js

Record: Identifies a single record in the vault. Handles logic for vault records. This is referred in the vault component and is a part of the same.
        Location: ./components/record.js

Form: A simple form based component defining a template used for authentication. 
      Location: ./components/form.js

Register: Handle registration of a new user to the backend.
          Location: ./components/registercomponent.js

As more components are added, they will be detailed here.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
PLEASE NOTE: I had started development of this frontend project with ReactJS but my thoughts are tending towards porting this to Next.JS in near future. The change may not be breaking
as Next.JS uses React under the hood but may have some syntax changes or changes to components. I shall commit and push my changes when the port is finished. As known, this is a self paced endeavour which I am undertaking to keep up my pace with new JS frameworks released every weekend! :)
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
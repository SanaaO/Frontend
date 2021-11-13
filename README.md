####  3D configurator Frontend application

Implement a 3D configurator tha allows to create, configure, manage 3D objetcs and shows a 3D visualization (animation) of a selected object based on it's configuration data retrieved from database.
- 3D object can be a BoxGeometry, ConeGeometry, CylinderGeometry or SphereGeometry.
- Link to [*Backend application*](https://github.com/SanaaO/Backend)
-  Used [*Clarity*](https://clarity.design/get-started/) for design
-  Used [*Theree.js*](https://clarity.design/get-started/) JavaScript library for 3D visualization

####  Done features

- [x] Create 3D object and store it in database
- [x] List all 3D objects stored in database
- [x] Select an Object and modify its properties(geometry)
- [x] Store updates in database
- [x] Select an object and visualize its 3D render
- [x] Select an object and delete it from database

#### Demo

#####  - Configure Interface

- Configure interface where user can list all the 3D objects stored in database

![alt text](https://github.com/SanaaO/Frontend/blob/Initilize_project/src/assets/images/ListOfObjects.PNG?raw=true)

- To create a new model we have to click on "Create 3D Object" button. This will open a Modal "Configure 3D object" where the user can choose a type (can be a BoxGeometry, ConeGeometry, CylinderGeometry or SphereGeometry) and enter the required parameters (geometries)

![alt text](https://github.com/SanaaO/Frontend/blob/Initilize_project/src/assets/images/addType.png?raw=true)

![alt text](https://github.com/SanaaO/Frontend/blob/Initilize_project/src/assets/images/add.PNG?raw=true)

- User can  also  update or delete a selected object using the same interface

![alt text](https://github.com/SanaaO/Frontend/blob/Initilize_project/src/assets/images/update_delete.PNG?raw=true)

##### - Display Interface

- To visualize the animation of a 3D object, we have to select its ID and choose a color then click on display.

![alt text](https://github.com/SanaaO/Frontend/blob/Initilize_project/src/assets/images/display.png?raw=true)

![alt text](https://github.com/SanaaO/Frontend/blob/Initilize_project/src/assets/images/cylinder.png?raw=true)

![alt text](https://github.com/SanaaO/Frontend/blob/Initilize_project/src/assets/images/sphere.png?raw=true)

![alt text](https://github.com/SanaaO/Frontend/blob/Initilize_project/src/assets/images/cone.png?raw=true)

![alt text](https://github.com/SanaaO/Frontend/blob/Initilize_project/src/assets/images/box.png?raw=true)

#### Perspectives 
- Animation of an object on mouse click
- Optimise the display of the object's informations
- Add a user defined name for each object and use it for selection (instead of ID)
- Include Meshing features (Mesh object, Mesh type, Mesh size...)
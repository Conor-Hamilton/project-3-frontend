# Bootcamp Buddy

## Description

Bootcamp Buddy is a collaborative, full-stack application designed to facilitate the sharing of advice among bootcamp students. BB serves as a platform for current and former bootcamp participants to offer advice, guidance and insights into the bootcamp experience. The tech stack for this project included React, TypeScript, and Tailwind for the frontend, with Express, MongoDB, and Mongoose powering the backend.

## Deployment link

Link to BB:
[Bootcamp Buddy](https://bootcamp-buddy.netlify.app/)

If you would like to login feel free to sign up or use the below credentials:  
`Username: a.user@bootcampbuddy.com  `  
`Password: M@tb0okbike`

## Getting Started/Code Installation

To set up the project locally, follow these steps:

1. Clone the repositories:

- `git clone git@github.com:Conor-Hamilton/project-3-frontend.git`
- `git clone git@github.com:Conor-Hamilton/project-3-backend.git`

2. Install dependencies for the backend:
- `cd project-3-backend`
- `npm install`

3. Start the backend server:
- `npm run start`

4. Navigate to the frontend directory and install dependencies:
- `cd ../project-3-frontend`
- `npm install`

5. Start the frontend server:
- `npm run dev`



## Timeframe & Working Team (Group)

This was a group project which spanned across 1 week. The team included myself and two colleagues, Michael Broadbent & Catherine Brett.


## Technologies Used

**Frontend:**
- React
- TypeScript
- Tailwind CSS

**Backend:**
- Express
- MongoDB
- Mongoose

**Development Tools:**
- Git
- GitHub
- Netlify (for deployment)
- Mongo Atlas (for database management)

## Brief

The brief tasked us with creating a full-stack MERN application that allowed for collaborative coding with git, multiple relationships and CRUD functionality across several models, and a visually compelling design, all deployed online.

## Planning

Our initial planning stage involved:
- Sketching user flow diagrams
- Wireframing the UI layout
- Creating ERDs for database schema
- Managing tasks with a Trello board

![User Flows Sketch](/src/assets/Backend-project3.png)
![Wireframe](/wireframe/frontend-wireframe.png)
![Trello Board Screenshot](/src/assets/Trello-Project3.png)

## Build/Code Process

During the build process we were very collaborative and made sure we all communicated. Some of the key highlights are:

- **Setting up authentication**: We integrated JWT and bcrypt for user authentication and secure routes.

This middleware function secureRoute is applied to routes that require authentication, verifying the token and allowing the request to proceed if the user is authenticated.  

```typescript
export default function secureRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("This route is secure!");
  const rawToken = req.headers.authorization;
  if (!rawToken) {
    return res.status(401).json({ message: "You are not authorized" });
  }
  const token = rawToken.replace("Bearer ", "");
  jwt.verify(token, SECRET, async (err, payload) => {
    console.log("verifying token...");
    if (err || !payload) {
      return res.status(401).json({ message: "You are not authorized" });
    }
    interface JwtPayload {
      userId: string;
    }

    const JwtPayload = payload as JwtPayload;
    const userId = JwtPayload.userId;

    const user = await Users.findById(userId);

    if (!user)
      return res.status(401).json({ message: "You are not authorized" });

    res.locals.currentUser = user;

    next();
  });
}
```


- **Developing the UI**: We used Tailwind for styling and ensured a responsive design across various devices.

While our team had prior experience with Bulma, I advocated for the adoption of Tailwind CSS, recognizing its potential to enhance our workflow and product design. Initially, there was hesitancy due to unfamiliarity, but I was confident that it would offer greater flexibility and efficiency. The one downside to Tailwind is the html looks rather messy! (but worth it)

- **Creating RESTful routes**: Our backend was structured to follow REST principles for ease of maintenance and scalability.

One of the core features of our backend is the RESTful routes that enable CRUD operations on user tips. Below is an example of how we handle the update operation with access control checks to ensure that only authorized users can edit a tip:

```typescript
export async function editTip(req: Request, res: Response) {
  const tipId = req.params.tipId;
  const update = req.body;
  const tipToEdit = await Tips.findById(tipId);

  if (!tipToEdit) {
    return res.status(404).send("Tip not found");
  }

  if (
    !(
      res.locals.currentUser._id.equals(tipToEdit.user) ||
      res.locals.currentUser.isAdmin
    )
  ) {
    return res.status(403).send("You do not have permission to edit this tip");
  }

  const updatedTip = await Tips.findByIdAndUpdate(tipId, update, { new: true });
  res.send(updatedTip);
}
```


## Challenges

A significant problem I encountered was related to the security of user-generated content. I noticed a vulnerability where users could potentially edit others' advice by manipulating the URL directly. So I implemented authorization checks within our `EditTip` component and secure routing. 

I take particular pride in this resolution as it demonstrated my capacity to identify and remedy potential security flaws. Despite being relatively new to the complexities of security, I had the awareness to scrutinize our app for such vulnerabilities and took proactive measures to ensure proper access control.  

In this screenshot I am logged in as myself (Conor) trying to edit Catherine's advice.
![EditTip Unauthorized Screenshot](/src/assets/EditTip-Unauthorized%20-%20Copy.png)


## Wins

- I'm proud of our teamwork and the collaboration that led to a fully functional app within the tight timeframe.
- The security feature that prevents unauthorized editing is one of the big wins for me this project.

## Key Learnings/Takeaways

- The project enhanced my understanding of React, Express, and particularly state management in complex applications.
- Being part of a team taught me a lot about working with others, sharing code responsibility, and using Git effectively. I learned how valuable communication and coordination are in a development project.

## Bugs

- No known bugs

## Future Improvements

- We plan to implement a commenting feature for advice posts and a like system to boost user engagement.



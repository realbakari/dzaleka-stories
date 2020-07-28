# Refugee Stories

## Update for Build Week Oct 21 - 25 (EU Team)
Issues with protected register route and hard-coded admin details in the seed files.
There was supposed to be a fall back pattern on all .env variables or they will be specified here. However they were not. So this fix aims to redeploy this script to Heroku on my account and define those config vars so my team can work with it.

INITIAL_ADMIN_EMAIL as defined in data\seeds\002-admin.js line 2
INITIAL_ADMIN_PASSWORD as defined in data\seeds\002-admin.js line 3
JWT_SECRET as defined in auth\token-handlers.js lines 14 && 24

## Table Of Contents

#### Public Endpoints

[Login](#login)<br>
[Fetch All Stories](#fetch-all)<br>
[Fetch Latest Stories](#fetch-latest)<br>
[Submit Story](#submit-story)<br>

#### Admin Endpoints

[Fetch Pending Stories](#fetch-pending)<br>
[Approve Story](#approve-story)<br>
[Reject Story](#reject-story)<br>
[Delete Story](#delete-story)<br>

---

## Base API URL

**https://bw-refugee-stories.herokuapp.com/**

---

<a name="login"></a>

## Login

_POST Request /api/auth/login_

### Body

| Name     | Type   | Required | Description     |
| -------- | ------ | -------- | --------------- |
| Email    | String | Yes      | User's email    |
| Password | String | Yes      | User's password |

### Response

**200 Ok**

> The server will respond with a welcome message and JWT to access restricted routes.

```
{
    "message": "Welcome!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1NTUxOTExNTIsImV4cCI6MTU1NTI3NzU1Mn0.ZwIH2g1ACpZcH8ast9qdRcutjKkN"
}
```

**400 Bad Request**

> If you fail to submit an email or password, you will receive a message instructing you to add these.

```
{
    "message": "Please provide an email and password."
}
```

---

<a name="fetch-all"></a>

## Fetch All Stories

_GET Request /api/stories_

### Response

**200 Ok**

> The server will respond with an array of all approved stories.

```
[
    {
        "id": 4,
        "title": "My second story",
        "highlight": "we won",
        "story": "Some more stuff went down"
    },
    {
        "id": 3,
        "title": "My second story",
        "highlight": "we won",
        "story": "Some more stuff went down"
    },
    {
        "id": 2,
        "title": "My third story",
        "highlight": "we won",
        "story": "Wow hey there"
    }
]
```

---

<a name="fetch-latest"></a>

## Fetch Latest Stories

_GET Request /api/stories/latest_

### Response

**200 Ok**

> The server will respond with an array of the latest three approved stories.

```
[
    {
        "id": 4,
        "title": "My second story",
        "highlight": "we won",
        "story": "Some more stuff went down"
    },
    {
        "id": 3,
        "title": "My second story",
        "highlight": "we won",
        "story": "Some more stuff went down"
    },
    {
        "id": 2,
        "title": "My third story",
        "highlight": "we won",
        "story": "Wow hey there"
    }
]
```

---

<a name="submit-story"></a>

## Submit A Story

_POST Request /api/stories_

### Body

| Name  | Type   | Required | Description  |
| ----- | ------ | -------- | ------------ |
| Title | String | Yes      | User's title |
| Story | String | Yes      | User's story |

### Response

**201 Created**

> The server will respond with the ID of the pending story.

```
{
    "id": 1
}
```

**401 Unauthorized**

> The server will respond with a message telling you the credentials are incorrect.

```
{
    "message": "Invalid credentials."
}
```

**400 Bad Request**

> If you fail to submit a title or story, you will receive a message instructing you to add these.

```
{
    "message": "Please provide a title and story to submit."
}
```

---

<a name="fetch-pending"></a>

## Fetch Pending Stories

_GET Request /api/admin/stories_

### Headers

| Name          | Required | Description |
| ------------- | -------- | ----------- |
| Authorization | Yes      | User's JWT  |

### Response

**200 Ok**

> The server will respond with an array of all pending stories.

```
[
    {
        "id": 4,
        "title": "My second story",
        "story": "Some more stuff went down"
    },
    {
        "id": 3,
        "title": "My second story",
        "story": "Some more stuff went down"
    },
    {
        "id": 2,
        "title": "My third story",
        "story": "Wow hey there"
    }
]
```

---

<a name="approve-story"></a>

## Approve A Story

_POST Request /api/admin/stories/approve/:id_

### Headers

| Name          | Required | Description |
| ------------- | -------- | ----------- |
| Authorization | Yes      | User's JWT  |

### Body

| Name      | Type   | Required | Description     |
| --------- | ------ | -------- | --------------- |
| Title     | String | Yes      | Story title     |
| Story     | String | Yes      | Story body      |
| Highlight | String | Yes      | Story highlight |

### Response

**201 Created**

> The server will respond with the new ID for the approved story.

```
{
    "newStoryID": 4
}
```

**400 Bad Request**

> If you fail to submit a title, story and highlight, you will receive a message instructing you to add these.

```
{
    "message": "Please provide a title, story, and highlight to add."
}
```

---

<a name="reject-story"></a>

## Reject A Story

_DELETE Request /api/admin/stories/reject/:id_

### Headers

| Name          | Required | Description |
| ------------- | -------- | ----------- |
| Authorization | Yes      | User's JWT  |

### Response

**200 Ok**

> The server will respond with a 200 and no body if the story was successfully rejected.

**404 Not Found**

> If the ID cannot be located, the server will provide a message and 404 not found error.

```
{
    "message": "Story could not be located."
}
```

---

<a name="delete-story"></a>

## Delete A Story

_Deletes an already approved story. Does not operate on pending stories. Please use reject if you need to remove a pending story._

_DELETE Request /api/admin/stories/delete/:id_

### Headers

| Name          | Required | Description |
| ------------- | -------- | ----------- |
| Authorization | Yes      | User's JWT  |

### Response

**200 Ok**

> The server will respond with a 200 and no body if the story was successfully deleted.

**404 Not Found**

> If the ID cannot be located, the server will provide a message and 404 not found error.

```
{
    "message": "Story could not be located."
}
```

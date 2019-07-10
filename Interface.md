# Consult information
{
  getPeople {
    _id
    name
    ... on Monitor {
      phone
    }
    ... on Student {
      avatar
    }
  }
}
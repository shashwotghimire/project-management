# feature request: Settings page & Profile page

## settings page:
  -- each org has a settings page, allow org admin to update organization details ( name, website url, logo(no api logic for this yet)) and delete org.
  -- design should be similar to other pages, a nav bar w notification bell icon

## user profile page:
  -- each user has his profile page
  -- allow updating username, password and profile picture (no api logic for this yet, just a dummy upload option just like org logo url).


  ### convention:

  -- check api endpoints for the non file upload features, if exists fine, else create it by checking the relevant model, wrriting seqeulize query in relevant repo, wrting service, controller, validation schema and routes for it

  -- in /web, implement the api by creating a req/res type first (in relevant file, else create it), then write service and react query hook ( follow existing pattern )
  -- then use the hook in the component.

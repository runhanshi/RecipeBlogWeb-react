import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";

import ExtRecipeSearch from "./ext-recipe/ext-recipe-search";
import extRecipeReducer from "./ext-recipe/ext-recipe-reducer"
import ExtRecipeDetails from "./ext-recipe/ext-recipe-detail";
import RecipeCreateSuccess from "./int-recipe/recipe-create-success";
import RecipeCreateFail from "./int-recipe/recipe-create-fail";
import intRecipeReducer from "./int-recipe/int-recipe-reducer"
import IntRecipeDetails from "./int-recipe/int-recipe-detail";
import RecipeDeleteFail from "./int-recipe/recipe-delete-fail";
import Home from "./home";
import recommendationsReducer from "./recommendations/recommendations-reducer";
import likesReducer from "./likes/likes-reducer";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {Routes, Route, Search} from "react-router";
import {BrowserRouter} from "react-router-dom";
import Navigation from "./navigation";
import Users from "./users";
import usersReducer from "./users/users-reducer";
import Login from "./users/login";
import Register from "./users/register";
import CurrentUser from "./users/current-user";
import Profile from "./users/profile";
import ProtectedRoute from "./users/protected-route";
import commentsReducer from "./comments/comments-reducer";
import PublicProfile from "./users/public-profile";
import followsReducer from "./follows/follows-reducer";
import IntRecipeSearch from "./int-recipe/int-recipe-search";

const store = configureStore({
    reducer: {
        follows: followsReducer,
        users: usersReducer,
        ext_recipe: extRecipeReducer,
        int_recipe: intRecipeReducer,
        comments: commentsReducer,
        likes: likesReducer,
        recommendations: recommendationsReducer,
    }
})

function App() {
    return (
        <div className="container mt-4 mb-4">
            <Provider store={store}>
                <BrowserRouter>
                    <CurrentUser>
                        <Navigation/>
                        <Routes>
                            <Route index element={<Home/>}/>
                            <Route path="/create-recipe" element={<ExtRecipeSearch/>}/>
                            <Route path="/create-recipe/:recipeID" element={<ExtRecipeDetails />} />
                            <Route path="/create-recipe/success/:intRecipeID" element={<RecipeCreateSuccess />} />
                            <Route path="/create-recipe/fail" element={<RecipeCreateFail />} />
                            <Route path="/recipes/:intRecipeID" element={<IntRecipeDetails />} />
                            <Route path="/delete-recipe/fail" element={<RecipeDeleteFail />} />
                            <Route path="/search" element={<IntRecipeSearch />} />
                            <Route path="/users" element={
                                <ProtectedRoute>
                                    <Users/>
                                </ProtectedRoute>
                            }/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="/profile" element={
                                <ProtectedRoute>
                                    <Profile/>
                                </ProtectedRoute>
                            }/>
                            <Route path="/profile/:uid" element={<PublicProfile/>}/>
                        </Routes>
                    </CurrentUser>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;

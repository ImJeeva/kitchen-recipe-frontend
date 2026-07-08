import { useState } from "react";
import { API } from "./global";
import { useQuery } from "@tanstack/react-query";
import { Recipe } from "./Recipe";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

function checkAuth(res) {
  if (res.status === 401) {
    throw Error("unauthorised");
  }
  return res.json();
}

function logout() {
  localStorage.clear();
  window.location.href = "/login";
}

export function Recipelist() {
  const [search, setSearch] = useState("");

  const { isLoading, data: obj } = useQuery(
    ["recipes"],
    async () =>
      await fetch(`${API}/allrecipe`, {
        headers: { "x-auth-token": localStorage.getItem("token") }
      })
        .then((res) => checkAuth(res))
        .catch(() => logout()),
    { staleTime: 10000, retry: 3 }
  );

  if (isLoading) {
    return (
      <div className="recipe-loading">
        <div className="recipe-skeleton-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div className="recipe-skeleton-card" key={i} />
          ))}
        </div>
      </div>
    );
  }

  const filtered = (obj || []).filter((mv) =>
    mv.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="recipe-list-page">
      <div className="recipe-list-header">
        <div>
          <h1>All Recipes</h1>
          <p>{obj?.length || 0} recipes shared by the community</p>
        </div>
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search recipes..."
          size="small"
          className="recipe-search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="no-results">
          <p>No recipes match "{search}"</p>
        </div>
      ) : (
        <div className="recipe-grid">
          {filtered.map((mv) => (
            <Recipe key={mv._id} data={mv} />
          ))}
        </div>
      )}
    </div>
  );
}

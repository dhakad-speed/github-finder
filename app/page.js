"use client";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Card,
  CardContent,
  Skeleton,
  Box,
  Autocomplete,
  TextField,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
export default function Home() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]); // displayed user cards
  const [options, setOptions] = useState([]); // autocomplete suggestions
  const [query, setQuery] = useState("");

  const [error, setError] = useState(null);

  const handleOptions = async (userQuery) => {
    if (!userQuery.trim()) return;
    setError(null);
    try {
      const { data } = await axios.get(`/api/github-users`, {
        params: { q: userQuery },
      });
      const items = data?.items ?? [];
      setOptions(items);
      setUsers(items);
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    if (!query.trim()) {
      setOptions([]);
      setUsers([]);
      return;
    }
    const handler = setTimeout(() => {
      handleOptions(query);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [query]);
  return (
    <div>
      {error && <h1 className="text-red-600">{error}</h1>}

      <div className="pt-6 px-0 sm:px-4 md:px-6 lg:px-0 flex flex-col sm:flex-row gap-3 w-full">
        <Box
          className="w-full"
          sx={{
            width: { xs: "calc(100vw - 24px)", sm: "100%", lg: 700 },
            ml: { xs: "calc(50% - 50vw + 12px)", sm: 0 },
            mr: { xs: "calc(50% - 50vw + 12px)", sm: 0 },
            mx: { lg: "auto" },
            display: "flex",
            alignItems: "center",
            padding: { xs: "10px 14px", sm: "8px 12px" },
            borderRadius: "8px",
            background: "transparent",
          }}
        >
          <Autocomplete
            freeSolo
            options={options}
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option?.login ?? ""
            }
            inputValue={query}
            onInputChange={(event, newInputValue) => setQuery(newInputValue)}
            onChange={(event, newValue) => {
              if (typeof newValue === "string") {
                setQuery(newValue);
                // when manual string submitted, do not change cards yet
              } else if (newValue && newValue.login) {
                setQuery(newValue.login);
                // show the selected user card(s)
                setUsers([newValue]);
              }
            }}
            sx={{
              width: "100%",
              fontSize: { xs: 14, sm: 16, md: 18 },
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                outline: "none",
                boxShadow: "none",
              },
              "& .MuiOutlinedInput-root:focus-within": {
                outline: "none",
                boxShadow: "none",
              },
              "& .MuiOutlinedInput-root.Mui-focused": {
                outline: "none",
                boxShadow: "none",
              },
              // ensure no sticky bottom border from any pseudo elements
              "& .MuiOutlinedInput-root:before": {
                borderBottom: "0 !important",
              },
              "& .MuiOutlinedInput-root:after": {
                borderBottom: "0 !important",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "0 !important",
              },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  border: "0 !important",
                },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  border: "0 !important",
                },
              "& .MuiOutlinedInput-input": {
                padding: "6px 16px",
              },
              // In case variant changes or defaults apply, also neutralize underline style
              "& .MuiInput-underline:before": {
                borderBottom: "0 !important",
              },
              "& .MuiInput-underline:after": {
                borderBottom: "0 !important",
              },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search User"
                variant="outlined"
                size="small"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#6b7280" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{}}
              />
            )}
            slotProps={{
              paper: {
                sx: {
                  borderRadius: "8px",
                  backgroundColor: "#ffffff",
                  border: 0,
                  mt: 0,
                  boxShadow:
                    "0px 1px 2px rgba(0,0,0,0.06), 0px 1px 3px rgba(0,0,0,0.1)",
                },
              },
              listbox: {
                sx: {
                  padding: "4px 0",
                  "& .MuiAutocomplete-option": {
                    padding: "6px 16px",
                    fontSize: { xs: 14, sm: 16, md: 18 },
                  },
                },
              },
            }}
          />
        </Box>
        {/* <Button
          sx={{
            color: "black",
            backgroundColor: "white",
            border: "1px solid #f1f1f1",
            borderRadius: "30px",
          }}
          onClick={() => handleUsers(query)}
        >
          search
        </Button> */}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-5 px-4 sm:px-6 lg:px-0">
        {loading
          ? Array.from(new Array(6)).map((_, index) => (
              <Card key={index}>
                <CardContent className="flex items-center gap-4 p-4 w-100">
                  <Skeleton
                    variant="circular"
                    width={64}
                    height={64}
                    animation="wave"
                  />
                  <div className="flex flex-col gap-2">
                    <Skeleton variant="text" width={120} height={20} />
                    <Skeleton variant="text" width={180} height={20} />
                  </div>
                </CardContent>
              </Card>
            ))
          : users.map((user) => {
              return (
                <Card key={user.id}>
                  <CardContent className="flex items-center gap-4 p-4 w-100">
                    <img
                      src={user?.avatar_url}
                      alt={user?.login}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">{user?.login}</h2>
                      <a
                        href={user?.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View Profile
                      </a>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
      </div>
    </div>
  );
}

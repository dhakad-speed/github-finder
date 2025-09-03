"use client";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Input, Button, Card, CardContent, Skeleton, Box } from "@mui/material";
import axios from "axios";
export default function Home() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  const [error, setError] = useState(null);

  const handleUsers = async (userQuery) => {
    if (!userQuery.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(
        `https://api.github.com/search/users?q=${encodeURIComponent(
          userQuery
        )}`,
        {
          headers: {
            Authorization: process.env.GITHUB_TOKEN,
          },
        }
      );
      setUsers(data?.items ?? []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!query.trim()) {
      setUsers([]);
    }
    const handler = setTimeout(() => {
      handleUsers(query);
    }, 1500);
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
            background: "#e5e7eb",
          }}
        >
          <SearchIcon
            sx={{
              fontSize: { xs: 22, sm: 26, md: 30, lg: 32 },
              color: "black",
            }}
          />
          <Input
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            placeholder="Search User"
            sx={{
              padding: { xs: "8px 8px", sm: "8px 12px" },
              width: "100%",
              fontSize: { xs: 14, sm: 16, md: 18 },
            }}
            disableUnderline
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

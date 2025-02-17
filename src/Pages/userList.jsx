import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableHead,
  Paper,
  CircularProgress,
  Typography,
  Pagination,
} from '@mui/material';
import Layout from '../Layout';
import axiosInstance from '../Utils/axiosInstance';
import UserListContent from '../Content/userList';
import {
  BodyCell,
  BodyRow,
  HeaderCell,
  HeaderRow,
  NotFoundCell,
  PaginationContainer,
  StyledTableContainer,
  TableBox,
  TotalCount,
} from '../Components/styled/styledComponent';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(7);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [page]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/User/allUsers?page=${page}&pageSize=${pageSize}`
      );
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
      setTotalUsers(response.data.totalUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value); // Update the page state when a specific page number is clicked
  };

  return (
    <Layout>
      <Typography variant="h4">{UserListContent.title}</Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableBox>
          <TotalCount>
            {UserListContent.total}{' '}
            <strong style={{ marginLeft: '4px' }}>{totalUsers}</strong>
          </TotalCount>
          <StyledTableContainer component={Paper}>
            <Table>
              <TableHead>
                <HeaderRow>
                  {Object.entries(UserListContent.header).map(
                    ([key, value]) => (
                      <HeaderCell key={key}>{value}</HeaderCell>
                    )
                  )}
                </HeaderRow>
              </TableHead>
              <TableBody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <BodyRow key={user.id}>
                      {Object.entries(user).map(([key, value]) => (
                        <BodyCell key={key}>{value}</BodyCell>
                      ))}
                    </BodyRow>
                  ))
                ) : (
                  <BodyRow>
                    <NotFoundCell colSpan={4}>
                      {UserListContent.noUser}
                    </NotFoundCell>
                  </BodyRow>
                )}
              </TableBody>
            </Table>
          </StyledTableContainer>
          <PaginationContainer>
            <Pagination
              count={totalPages} // Total number of pages
              page={page} // Current page
              onChange={handlePageChange} // Handle page change
              variant="outlined"
              color="primary"
            />
          </PaginationContainer>
        </TableBox>
      )}
    </Layout>
  );
};

export default UserList;

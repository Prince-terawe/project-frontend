import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import Layout from '../Layout/index';
import { BoxContainer } from '../Components/styled/styledComponent';
import ProfileContent from '../Content/profile';
import { useSelector } from 'react-redux';
import axiosInstance from '../Utils/axiosInstance';
import { toast } from 'react-toastify';

const Profile = () => {
  const [userLog, setUserLog] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetchUserLog();
    // eslint-disable-next-line
  }, []);

  const fetchUserLog = async () => {
    try {
      const response = await axiosInstance.get(`UserLog/getUserLog/${user.id}`);
      const userLogData = response.data;
      setUserLog(userLogData);
    } catch (error) {
      toast.error('Error fetching Users Log', +error);
    }
  };

  // Function to format date to Indian Standard Time (IST)
  const formatToIST = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  if (!user) {
    return (
      <Layout>
        <Typography variant="h4" gutterBottom>
          {ProfileContent.noUser}
        </Typography>
      </Layout>
    );
  }

  return (
    <Layout>
      <BoxContainer>
        <Typography variant="h4" gutterBottom>
          {ProfileContent.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {ProfileContent.loginCount} {userLog.loginCount}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {ProfileContent.name} {user.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {ProfileContent.email} {user.email}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {ProfileContent.duration} {userLog.sessionDuration}{' '}
          {ProfileContent.timeMin}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {ProfileContent.lastLogin} {formatToIST(userLog.lastLogin)}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {ProfileContent.sessionExp} {formatToIST(userLog.sessionExpire)}
        </Typography>
      </BoxContainer>
    </Layout>
  );
};

export default Profile;

import { Add, Delete, Edit } from '@mui/icons-material';
import { Box, Button, Grid, IconButton, MenuItem, Paper, TextField } from '@mui/material';
import { useState } from 'react';

const platforms = [
	{ label: 'Play Store', value: 'play' },
	{ label: 'App Store', value: 'itunes' },
	{ label: 'Windows Store', value: 'windows' },
];

const RelatedApplicationsField = ({ value = [], onChange }) => {
	const [applications, setApplications] = useState(value);
	const [newApp, setNewApp] = useState({ platform: '', url: '' });
	const [editIndex, setEditIndex] = useState<number | null>(null);
	const handleAddApplication = () => {
		if (newApp.platform && newApp.url) {
			const updatedApplications = [...applications, newApp];
			setApplications(updatedApplications);
			onChange(updatedApplications);
			setNewApp({ platform: '', url: '' });
		}
	};
	const handleRemoveApplication = index => {
		const updatedApplications = applications.filter((_, i) => i !== index);
		setApplications(updatedApplications);
		onChange(updatedApplications);
	};
	const handleEditApplication = index => {
		setEditIndex(index);
		setNewApp(applications[index]);
	};
	const handleSaveEdit = () => {
		if (editIndex !== null) {
			const updatedApplications = applications.map((app, index) => (index === editIndex ? newApp : app));
			setApplications(updatedApplications);
			onChange(updatedApplications);
			setEditIndex(null);
			setNewApp({ platform: '', url: '' });
		}
	};
	return (
		<Box>
			<Grid spacing={2} container>
				{applications.map((app, index) => (
					<Grid item key={index} xs={12}>
						<Paper
							sx={{
								display: 'flex',
								alignItems: 'center',
								p: 2,
								borderRadius: 2,
								boxShadow: theme => `0 2px 8px ${theme.palette.action.hover}`,
								transition: 'all 0.3s ease',
								'&:hover': {
									boxShadow: theme => `0 4px 12px ${theme.palette.action.hover}`,
								},
							}}
							elevation={3}
						>
							<TextField
								select
								disabled={editIndex !== index}
								label="Platform"
								sx={{ flex: 1, mr: 2 }}
								value={app.platform}
							>
								{platforms.map(option => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
							<TextField disabled={editIndex !== index} label="URL" sx={{ flex: 2, mr: 2 }} value={app.url} />
							{editIndex === index ? (
										<Button variant="contained" color="primary" onClick={handleSaveEdit}>
									Save
               </Button>
									) : (
										<>
											<IconButton color="primary" onClick={() => handleEditApplication(index)}>
												<Edit />
											</IconButton>
											<IconButton color="error" onClick={() => handleRemoveApplication(index)}>
												<Delete />
											</IconButton>
										</>
									)}
						</Paper>
					</Grid>
				))}
				<Grid item xs={12}>
					<Paper
						sx={{
							display: 'flex',
							alignItems: 'center',
							p: 2,
							borderRadius: 2,
							boxShadow: theme => `0 2px 8px ${theme.palette.action.hover}`,
							transition: 'all 0.3s ease',
							'&:hover': {
								boxShadow: theme => `0 4px 12px ${theme.palette.action.hover}`,
							},
						}}
						elevation={3}
					>
						<TextField
							select
							label="Platform"
							sx={{ flex: 1, mr: 2 }}
							value={newApp.platform}
							onChange={e => setNewApp({ ...newApp, platform: e.target.value })}
						>
							{platforms.map(option => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>
						<TextField
							label="URL"
							sx={{ flex: 2, mr: 2 }}
							value={newApp.url}
							onChange={e => setNewApp({ ...newApp, url: e.target.value })}
						/>
						<Button
							sx={{
								textTransform: 'none',
								fontWeight: 500,
								boxShadow: theme => `0 2px 4px ${theme.palette.primary.main}`,
								transition: 'all 0.3s ease',
								'&:hover': {
									boxShadow: theme => `0 4px 8px ${theme.palette.primary.main}`,
								},
							}}
							variant="contained"
							color="primary"
							onClick={handleAddApplication}
							startIcon={<Add />}
						>
							Add
						</Button>
					</Paper>
				</Grid>
			</Grid>
		</Box>
	);
};

export default RelatedApplicationsField;

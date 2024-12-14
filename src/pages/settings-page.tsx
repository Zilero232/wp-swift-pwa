import { Save } from '@mui/icons-material';
import {
	Alert,
	Box,
	Button,
	Card,
	CardContent,
	CircularProgress,
	FormControlLabel,
	FormGroup,
	FormHelperText,
	MenuItem,
	Stack,
	Switch,
	TextField,
	Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

import ColorPicker from '@/components/form/color-picker';
import { Display, Orientation } from '@/types/modules/settings';

export const SettingsPage = () => {
	if (false) {
		return (
			<Box display="flex" p={4} justifyContent="center">
				<CircularProgress />
			</Box>
		);
	}

	if (false) {
		return (
			<Alert severity="error" sx={{ mb: 2 }}>
				123
			</Alert>
		);
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
	};

	return (
		<form onSubmit={handleSubmit}>
			<Stack spacing={3}>
				<Card>
					<CardContent>
						<Typography variant="h6" gutterBottom>
							Основные настройки
						</Typography>
						<Grid spacing={2} container>
							<Grid size={{ xs: 12, md: 6 }}>
								<TextField fullWidth helperText="Полное название вашего PWA приложения" label="Название приложения" />
							</Grid>

							<Grid size={{ xs: 12, md: 6 }}>
								<TextField
									fullWidth
									helperText="Короткое название для иконки на домашнем экране"
									label="Короткое название"
								/>
							</Grid>

							<Grid size={{ xs: 12 }}>
								<TextField fullWidth multiline label="Описание" rows={3} />
							</Grid>
						</Grid>
					</CardContent>
				</Card>

				{/* URL и область видимости */}
				<Card>
					<CardContent>
						<Typography variant="h6" gutterBottom>
							URL и область видимости
						</Typography>
						<Grid spacing={2} container>
							<Grid size={{ xs: 12, md: 6 }}>
								<TextField fullWidth helperText="URL, который открывается при запуске" label="Начальный URL" />
							</Grid>

							<Grid size={{ xs: 12, md: 6 }}>
								<TextField fullWidth helperText="Область видимости приложения" label="Область видимости" />
							</Grid>

							<Grid size={{ xs: 12, md: 6 }}>
								<TextField fullWidth select helperText="Как приложение должно отображаться" label="Режим отображения">
									<MenuItem value={Display.STANDALONE}>Отдельное приложение</MenuItem>
									<MenuItem value={Display.FULLSCREEN}>Полный экран</MenuItem>
									<MenuItem value={Display.MINIMAL_UI}>Минимальный UI</MenuItem>
									<MenuItem value={Display.BROWSER}>Браузер</MenuItem>
								</TextField>
							</Grid>

							<Grid size={{ xs: 12, md: 6 }}>
								<TextField fullWidth select helperText="Предпочтительная ориентация экрана" label="Ориентация">
									<MenuItem value={Orientation.ANY}>Любая</MenuItem>
									<MenuItem value={Orientation.NATURAL}>Естественная</MenuItem>
									<MenuItem value={Orientation.LANDSCAPE}>Альбомная</MenuItem>
									<MenuItem value={Orientation.PORTRAIT}>Портретная</MenuItem>
								</TextField>
							</Grid>
						</Grid>
					</CardContent>
				</Card>

				{/* Внешний вид */}
				<Card sx={{ overflow: 'visible' }}>
					<CardContent>
						<Typography variant="h6" gutterBottom>
							Внешний вид
						</Typography>

						<Grid spacing={2} sx={{ mt: 2 }} container>
							<Grid size={{ md: 6, xs: 12 }}>
								<ColorPicker helperText="Основной цвет темы приложения" label="Цвет темы" value="#000000" />
							</Grid>

							<Grid size={{ md: 6, xs: 12 }}>
								<ColorPicker helperText="Цвет фона для сплэш-скрина" label="Цвет фона" />
							</Grid>

							<Grid size={{ xs: 12 }}>{/* <IconUploader /> */}</Grid>
						</Grid>
					</CardContent>
				</Card>

				{/* Локализация */}
				<Card>
					<CardContent>
						<Typography variant="h6" gutterBottom>
							Локализация
						</Typography>

						<Grid spacing={2} container>
							<Grid size={{ xs: 12, md: 6 }}>
								<TextField fullWidth helperText="Основной язык приложения" label="Язык" />
							</Grid>

							<Grid size={{ xs: 12, md: 6 }}>
								<TextField fullWidth select helperText="Направление чтения текста" label="Направление текста">
									<MenuItem value="ltr">Слева направо</MenuItem>
									<MenuItem value="rtl">Справа налево</MenuItem>
								</TextField>
							</Grid>
						</Grid>
					</CardContent>
				</Card>

				{/* Поведение */}
				<Card>
					<CardContent>
						<Typography variant="h6" gutterBottom>
							Поведение и производительность
						</Typography>

						<FormGroup>
							<FormControlLabel label="Оффлайн режим" control={<Switch checked={true} />} />
							<FormHelperText>Позволяет приложению работать без интернета</FormHelperText>

							<FormControlLabel label="Push-уведомления" control={<Switch checked={true} />} />

							<FormControlLabel label="Поддержка Share Target API" control={<Switch checked={true} />} />

							<FormControlLabel label="Предпочитать связанные приложения" control={<Switch checked={true} />} />
						</FormGroup>
					</CardContent>
				</Card>

				{/* Кнопка сохранения */}
				<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
					<Button type="submit" variant="contained" color="primary" startIcon={<Save />}>
						Сохранить настройки
					</Button>
				</Box>
			</Stack>
		</form>
	);
};

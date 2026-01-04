import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function FloatingAddButton() {
    const navigate = useNavigate();
    const fabstyle = {
        position: "absolute",
        bottom: 16,
        right: 16,
    }
    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Tooltip title="Add new entry" arrow>

                <Fab onClick={() => navigate('/Add')} sx={fabstyle} size="medium" color="secondary" aria-label="add">
                    <AddIcon />
                </Fab>
            </Tooltip>

        </Box>
    );
}

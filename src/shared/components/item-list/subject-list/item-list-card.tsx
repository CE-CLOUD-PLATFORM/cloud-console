/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-unused-vars */
import type { FC } from 'react';
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import DotsVerticalIcon from '@untitled-ui/icons-react/build/esm/DotsVertical';
import {
  Box,
  Card,
  Divider,
  IconButton,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import { usePopover } from '@/shared/hooks/use-popover';
import { ItemIcon } from './item-icon';
import { ItemMenu } from './item-menu';
import type { Subject } from '@/modules/subject/types/subject';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ItemListCardProps {
  item: Subject;
  onDelete?: (itemId: string) => void;
  onFavorite?: (itemId: string, value: boolean) => void;
  onOpen?: (itemId: string) => void;
}

export const ItemListCard: FC<ItemListCardProps> = (props) => {
  const { item, onDelete, onFavorite, onOpen } = props;
  const popover = usePopover<HTMLButtonElement>();
  const pathName = usePathname();
  const handleDelete = useCallback((): void => {
    popover.handleClose();
    onDelete?.(item.id);
  }, [item, popover, onDelete]);

  const size = '1';

  const createdAt = '123';

  return (
    <>
      <Card
        key={item.id}
        sx={{
          backgroundColor: 'transparent',
          boxShadow: 0,
          transition: (theme) =>
            theme.transitions.create(['background-color, box-shadow'], {
              easing: theme.transitions.easing.easeInOut,
              duration: 200,
            }),
          '&:hover': {
            backgroundColor: 'background.paper',
            boxShadow: 16,
          },
        }}
        variant="outlined"
        className="relative"
      >
        <Stack
          className="absolute right-0 top-0 z-50"
          alignItems="center"
          direction="row-reverse"
          justifyContent="space-between"
          spacing={3}
          sx={{
            pt: 2,
            px: 2,
          }}
        >
          <IconButton onClick={popover.handleOpen} ref={popover.anchorRef}>
            <SvgIcon fontSize="small">
              <DotsVerticalIcon />
            </SvgIcon>
          </IconButton>
        </Stack>
        <Box sx={{ p: 2, bgcolor: 'white' }}>
          <Link
            href={`${pathName}/${item.id}/instance`}
            // href={`${pathName}/${item.id}/overview`}
            className="cursor-pointer"
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                mb: 1,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  mb: 1,
                }}
              >
                <Box
                  sx={{
                    display: 'inline-flex',
                    cursor: 'pointer',
                  }}
                >
                  <ItemIcon />
                </Box>
              </Box>
              <Typography
                sx={{
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  color: 'black',
                  minHeight:"48px",
                }}
              >
                {item.name}
              </Typography>
            </Box>
          </Link>

          <Divider sx={{ my: 1 }} />
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            spacing={1}
          >
            <Typography className='h-[22px]' color="text.secondary" variant="body2">
              {item.description || ''}
            </Typography>
          </Stack>
          {/* <Typography color="text.secondary" variant="caption">
            Created at {createdAt}
          </Typography> */}
        </Box>
      </Card>
      <ItemMenu
        anchorEl={popover.anchorRef.current}
        onClose={popover.handleClose}
        onDelete={handleDelete}
        open={popover.open}
      />
    </>
  );
};

ItemListCard.propTypes = {
  // @ts-ignore
  item: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
  onFavorite: PropTypes.func,
  onOpen: PropTypes.func,
};

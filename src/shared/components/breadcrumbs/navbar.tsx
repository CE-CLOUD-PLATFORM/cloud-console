'use client';
import { useCurrentGroupStore } from '@/modules/group/store/use-current-group-store';
import { useItemsStore } from '@/modules/subject/store/use-subjects-store';
import { paths } from '@/paths';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

interface ExtractedIds {
  sid?: string;
  gid?: string;
}

const BreadcrumbsComponent = () => {
  const subjects = useItemsStore();
  const currentGroup = useCurrentGroupStore((state) => state.group);
  const pathname = usePathname();
  const disableBreadcrumbs = ['management'];

  const getPathPatterns = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    obj: Record<string, any>,
    result: string[] = [],
  ): string[] => {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        result.push(obj[key]);
      } else if (typeof obj[key] === 'object') {
        getPathPatterns(obj[key], result);
      }
    }
    return result;
  };

  const findMatchingPattern = (currentPath: string): string | null => {
    const allPatterns = getPathPatterns(paths);
    const paramPatterns = allPatterns.filter(
      (pattern) => pattern.includes(':sid') || pattern.includes(':gid'),
    );

    for (const pattern of paramPatterns) {
      const regex = new RegExp(
        '^' + pattern.replace(/:sid|:gid/g, '([^/]+)') + '$',
      );
      if (regex.test(currentPath)) {
        return pattern;
      }
    }
    return null;
  };

  const extractIdsFromPath = (
    currentPath: string,
    pattern: string,
  ): ExtractedIds => {
    const patternParts = pattern.split('/');
    const pathParts = currentPath.split('/');
    const result: ExtractedIds = {};

    patternParts.forEach((part, index) => {
      if (part === ':sid') {
        result.sid = pathParts[index];
      } else if (part === ':gid') {
        result.gid = pathParts[index];
      }
    });

    return result;
  };

  const getDisplayName = (
    segment: string,
    extractedIds: ExtractedIds,
  ): string => {
    // ตรวจสอบ Subject ID
    if (extractedIds.sid && segment === extractedIds.sid) {
      const subjectData = subjects.subjectIdNames?.find(
        (item) => item.id === extractedIds.sid,
      );
      if (subjectData) return subjectData.name;
    }

    // ตรวจสอบ Group ID - ใช้ currentGroup store
    if (extractedIds.gid && segment === extractedIds.gid) {
      if (currentGroup && currentGroup.id === extractedIds.gid) {
        return currentGroup.name;
      }
    }

    // Default display name
    return segment.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const matchingPattern = findMatchingPattern(pathname);
  const extractedIds = matchingPattern
    ? extractIdsFromPath(pathname, matchingPattern)
    : {};

  const pathSegments = pathname
    .split('/')
    .filter(
      (segment) => segment !== '' && !disableBreadcrumbs.includes(segment),
    );

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const path = '/' + pathSegments.slice(0, index + 1).join('/');
    const isLast = index === pathSegments.length - 1;
    const displayName = getDisplayName(segment, extractedIds);

    if (isLast) {
      return (
        <Typography key={path} sx={{ color: 'text.primary' }}>
          {displayName}
        </Typography>
      );
    }

    return (
      <Link
        key={path}
        component={NextLink}
        underline="hover"
        color="inherit"
        href={path}
      >
        {displayName}
      </Link>
    );
  });

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link component={NextLink} underline="hover" color="inherit" href="/">
        Home
      </Link>
      {breadcrumbItems}
    </Breadcrumbs>
  );
};

export default BreadcrumbsComponent;

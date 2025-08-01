import { paths } from '@/paths';
import { permanentRedirect } from 'next/navigation';

export default function Page() {
  permanentRedirect(paths.subject.index);
}

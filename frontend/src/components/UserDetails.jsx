import { Mail, UserRound } from 'lucide-react';

export const DetailItem = ({ icon: Icon, label, value }) => (
  <div className='flex items-center gap-3 rounded-xl bg-white/[0.03] px-3 py-3'>
    <Icon className='h-4 w-4 shrink-0 text-indigo-300' />
    <div className='min-w-0'>
      <p className='text-xs text-slate-400'>{label}</p>
      <p className='truncate text-sm font-medium text-white'>{value || 'Not available'}</p>
    </div>
  </div>
);

const UserDetails = ({ user }) => {
  return (
    <div className='space-y-3'>
      <DetailItem icon={UserRound} label='Name' value={user?.name} />
      <DetailItem icon={Mail} label='Email' value={user?.email} />
    </div>
  );
};

export default UserDetails

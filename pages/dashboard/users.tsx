import {NextSeo} from 'next-seo'
import {GetStaticProps} from 'next'
import {ArrowRightIcon} from '@heroicons/react/outline'
import DataTable from '../../components/DataTable'
import {useGetAllUsersQuery} from '../../store/api/baseApi'

const css = {
  title: 'text-xl sm:text-2xl md:text-3xl uppercase font-medium mb-6 sm:mb-8 md:mb-10',
  actionIcon: 'w-6 text-gray-400 group-hover:text-orange-600',
  body: '',
  avatar:
    'h-9 w-9 rounded-full bg-black text-white text-sm font-bold flex items-center justify-center',
}

const STRUCTURE = [
  {
    selector: (r: any) => <div className={css.avatar}>{r.name.slice(0, 1)}</div>,
    className: 'col-span-1',
  },
  {
    title: 'Full Name',
    selector: (r: any) => r.name,
    className: 'col-span-3 truncate',
    isBold: true,
  },
  {
    title: 'Email',
    selector: (r: any) => r.email,
    className: 'col-span-3 truncate',
  },
  {
    title: 'Username',
    selector: (r: any) => r.username,
    className: 'col-span-3 truncate',
  },
  {
    title: 'Role',
    selector: (r: any) => r.role,
    className: 'col-span-1 truncate',
  },
  {
    selector: (d: any) => <ArrowRightIcon className={css.actionIcon} />,
    className: 'justify-end',
  },
]

const QUERY_FILTER = {
  limit: 10,
  page: 1,
}

const AdminUsers = () => {
  const {data, isLoading, isFetching} = useGetAllUsersQuery()
  const {users} = data || {}
  const showLoader = isLoading || isFetching

  return (
    <div>
      <NextSeo title="All Users" />
      <h1 className={css.title}>Users</h1>
      <div className={css.body}>
        <DataTable
          isLoading={showLoader}
          skeletons={QUERY_FILTER.limit}
          basePath="/admin/users"
          data={users as any}
          structure={STRUCTURE}
        />
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      withAuth: true,
      userRoles: ['admin'],
    },
  }
}

export default AdminUsers
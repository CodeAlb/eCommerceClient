import {GetStaticProps} from 'next'
import Link from 'next/link'
import DataTableWithSearch from '../../components/DataTableWithSearch'
import {EditIcon} from '../../components/Svg'
import {useGetAllUsersQuery} from '../../store/services/user'
import {cn} from '../../utils/helpers'

const css = {
  title: 'text-xl sm:text-2xl md:text-3xl uppercase font-medium mb-6 sm:mb-8 md:mb-10',
  btn: 'whitespace-nowrap inline-flex items-center justify-center duration-150 text-white bg-orange-400 hover:bg-orange-600 h-8 w-8 rounded',
  btnIcon: 'w-5',
  cell: 'text-base py-1.5',
  body: '',
}

const COLUMNS = [
  {
    name: 'Username',
    selector: (r: any) => r.username,
    sortable: false,
    cell: (r: any) => <span className={css.cell}>{r.username}</span>,
    grow: 2,
  },
  {
    name: 'Name',
    selector: (r: any) => r.name,
    sortable: true,
    cell: (r: any) => <span className={css.cell}>{r.name}</span>,
    grow: 3,
  },
  {
    name: 'Email',
    selector: (r: any) => r.email,
    sortable: true,
    cell: (r: any) => <span className={cn(css.cell, 'truncate')}>{r.email}</span>,
    grow: 5,
  },
  {
    name: 'Role',
    selector: (r: any) => r.role,
    sortable: true,
    cell: (r: any) => <span className={css.cell}>{r.role}</span>,
    grow: 2,
  },
  {
    name: 'Action',
    selector: false,
    sortable: true,
    cell: (d: any) => (
      <Link href={`/admin/user/${d._id}`}>
        <a className={css.btn}>
          <EditIcon className={css.btnIcon} />
        </a>
      </Link>
    ),
    grow: 0,
  },
]

const AdminUsers = () => {
  const {data, isLoading} = useGetAllUsersQuery()
  const {users} = data || {}

  return (
    <div>
      <h1 className={css.title}>Users</h1>
      <div className={css.body}>
        <DataTableWithSearch
          placeholder="Search user..."
          data={users as any}
          columns={COLUMNS as any}
          keyField="_id"
          searchPattern={(i: any) => [i._id, i.name, i.email, i.role].join(' ')}
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

import UserTable from "@/components/users/user.table";

const UserPage = async (props: any) => {
    const LIMIT = 3;
    const page = props?.searchParams?.page ?? 1;

    const res = await fetch(`http://localhost:8000/users?_page=${page}&_limit=${LIMIT}&_sort=id&_order=desc`, {
        method: "GET",
        next: { tags: ['list-users'] }
    });

    const total_items = +(res.headers?.get("X-Total-Count") ?? 0);
    const data = await res.json();

    return (
        <>
            <UserTable
                users={data ? data : []}
                meta={
                    {
                        current: +page,
                        pageSize: LIMIT,
                        total: total_items
                    }
                }
            />
        </>
    )
}

export default UserPage;
import { useAuth } from "../context/AuthContext";




function PostFormPage() {
  
  const {user} = useAuth()
  console.log(user)
  
  return (
    <div>PostFormPage</div>
  )
}

export default PostFormPage
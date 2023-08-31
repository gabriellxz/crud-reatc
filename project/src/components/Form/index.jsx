import "./styles.css";
import { useForm } from 'react-hook-form'
import api from '../../lib/axios'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'

const postSchema = yup.object({
  title: yup.string().required("Preencha o título"),
  content: yup.string().required("Preencha o seu conteúdo"),
  description: yup.string().required("Preencha sua descrição"),
})

export function Form({ title, button }) {

  const navigate = useNavigate()

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(postSchema)
  })

  function handleSubmitPost(data) {
    api.post("/posts", data)
    .then(() => {
      navigate("/")
    })
    reset()
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitPost)}>
      <h2>{title}</h2>
      <div className="field">
        <input placeholder="Título" {...register("title")} />
        {errors.title?.message}
      </div>

      <div className="field">
        <input placeholder="Descrição" {...register("description")} />
        {errors.description?.message}
      </div>

      <div className="field">
        <textarea placeholder="Conteúdo" {...register("content")} />
        {errors.content?.message}
      </div>

      <button>{button}</button>
    </form>
  );
}

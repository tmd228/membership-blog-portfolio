import React, { useState } from 'react'
import styles from './CreateGroup.module.css'

function CreateGroup() {

    const [groupName, setGroupName] = useState('')
    const [description, setDescription] = useState('')


    const handleCreateGroup = () => {
        //groupName, ownerId, createdAt, description, isPrivate
    }

  return (
    <div>
        <form onSubmit={handleCreateGroup}>
            <label htmlFor="groupName">그룹이름</label>
            <input type="text" id='groupName' value={groupName} onChange={(e)=> setGroupName(e.target.value)} required />
            
            <label htmlFor="description">설명</label>
            <input type="textarea" id='description' value={description} onChange={(e)=> setDescription(e.target.value)} required />

            <button type='submit'>그룹만들기</button>
        </form>
    </div>
  )
}

export default CreateGroup
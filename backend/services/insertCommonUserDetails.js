import asyncHandler from 'express-async-handler';
import sequelize from '../config/sqlClient.js';

export const insertCommonDetails = asyncHandler(async ({ transaction, createdEntityId, details, documents }) => {
    // Insert Address
    const { address: street_address, city, state, country, postalCode } = details.address;
    const [addressId] = await sequelize.query(
        `INSERT INTO addresses (entity_type, entity_id, address_type, address, city, state, country, postal_code)
             VALUES ("SELLER", :createdEntityId, "business", :street_address, :city, :state, :country, :postalCode)`,
        { replacements: { createdEntityId, street_address, city, state, country, postalCode }, type: sequelize.QueryTypes.INSERT, transaction }
    );
    // Map address to seller in entity relations
    await sequelize.query(
        `INSERT INTO entity_relations (entity_type, entity_id, related_type, related_id)
                     VALUES ("SELLER", :createdEntityId, "ADDRESS", :addressId)`,
        {
            replacements: { createdEntityId, addressId },
            type: sequelize.QueryTypes.INSERT,
            transaction
        }
    );
    console.log("Successfully mapped address to seller");

    // Insert Bank Details
    const { account_holder_name, bank_name, account_number, ifsc_code, account_type, upi_id } = details.bank;
    const [bankId] = await sequelize.query(
        `INSERT INTO banks (entity_type, entity_id, account_holder_name, bank_name, account_number, ifsc_code, account_type, upi_id)
             VALUES ("SELLER", :createdEntityId, :account_holder_name, :bank_name, :account_number, :ifsc_code, :account_type, :upi_id)`,
        { replacements: { createdEntityId, account_holder_name, bank_name, account_number, ifsc_code, account_type, upi_id }, type: sequelize.QueryTypes.INSERT, transaction }
    );
    // Map bank details to seller in entity relations
    await sequelize.query(
        `INSERT INTO entity_relations (entity_type, entity_id, related_type, related_id)
                     VALUES ("SELLER", :createdEntityId, "BANK", :bankId)`,
        {
            replacements: { createdEntityId, bankId },
            type: sequelize.QueryTypes.INSERT,
            transaction
        }
    );
    console.log("Successfully mapped bank details to seller");
    // Insert Documents
    for (const doc of documents) {
        const { documentType, publicId, fileType } = doc;
        const [documentId] = await sequelize.query(
            `INSERT INTO documents (entity_type, entity_id, document_type, public_id, file_type)
                 VALUES ("SELLER", :createdEntityId, :documentType, :publicId, :fileType)`,
            { replacements: { createdEntityId, documentType, publicId, fileType }, type: sequelize.QueryTypes.INSERT, transaction }
        );
        // Map document details to seller in entity relations
        await sequelize.query(
            `INSERT INTO entity_relations (entity_type, entity_id, related_type, related_id)
                         VALUES ("SELLER", :createdEntityId, "DOCUMENT", :documentId)`,
            {
                replacements: { createdEntityId, documentId },
                type: sequelize.QueryTypes.INSERT,
                transaction
            }
        );
        console.log(`Successfully mapped document to seller`);
    }
});
